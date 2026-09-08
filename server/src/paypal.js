import { env, paypalApiBase, paypalCheckoutBase } from "./env.js";

let cachedToken = { value: "", expiresAt: 0 };

async function paypalFetch(path, options = {}) {
  const token = await getAccessToken();
  const response = await fetch(`${paypalApiBase()}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = { raw: text };
  }

  if (!response.ok) {
    const message =
      body?.message ||
      body?.error_description ||
      body?.details?.[0]?.description ||
      `PayPal error ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.details = body;
    throw error;
  }

  return body;
}

export async function getAccessToken() {
  if (cachedToken.value && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  if (!env.paypalClientId || !env.paypalClientSecret) {
    const error = new Error(
      "Faltan PAYPAL_CLIENT_ID o PAYPAL_CLIENT_SECRET en el fichero .env",
    );
    error.status = 500;
    throw error;
  }

  const auth = Buffer.from(
    `${env.paypalClientId}:${env.paypalClientSecret}`,
  ).toString("base64");

  const response = await fetch(`${paypalApiBase()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const body = await response.json();
  if (!response.ok) {
    const error = new Error(
      body.error_description || "No se pudo autenticar con PayPal",
    );
    error.status = response.status;
    error.details = body;
    throw error;
  }

  cachedToken = {
    value: body.access_token,
    expiresAt: Date.now() + (body.expires_in - 60) * 1000,
  };

  return cachedToken.value;
}

export function buildApprovalUrl(orderId, fundingSource) {
  const url = new URL(`${paypalCheckoutBase()}/checkoutnow`);
  url.searchParams.set("token", orderId);
  if (fundingSource === "paylater") {
    url.searchParams.set("fundingSource", "paylater");
    url.searchParams.set("enable-funding", "paylater");
  }
  return url.toString();
}

function findApproveLink(order) {
  return (
    order.links?.find((link) =>
      ["approve", "payer-action"].includes(link.rel),
    )?.href || ""
  );
}

export async function createOrder({
  product,
  totals,
  fundingSource,
  returnUrl,
  cancelUrl,
}) {
  const order = await paypalFetch("/v2/checkout/orders", {
    method: "POST",
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: product.id,
          description: product.title,
          custom_id: fundingSource,
          amount: {
            currency_code: env.currency,
            value: totals.totalFormatted,
            breakdown: {
              item_total: {
                currency_code: env.currency,
                value: totals.itemFormatted,
              },
              handling: {
                currency_code: env.currency,
                value: totals.protectionFormatted,
              },
              shipping: {
                currency_code: env.currency,
                value: totals.shippingFormatted,
              },
            },
          },
          items: [
            {
              name: product.title.slice(0, 127),
              quantity: "1",
              unit_amount: {
                currency_code: env.currency,
                value: totals.itemFormatted,
              },
              category: "PHYSICAL_GOODS",
            },
          ],
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: "UNRESTRICTED",
            brand_name: env.brandName,
            locale: "es-ES",
            landing_page: "LOGIN",
            user_action: "PAY_NOW",
            return_url: returnUrl,
            cancel_url: cancelUrl,
          },
        },
      },
    }),
  });

  const approveLink = findApproveLink(order);
  const approvalUrl = fundingSource === "paylater"
    ? buildApprovalUrl(order.id, "paylater")
    : approveLink || buildApprovalUrl(order.id);

  return {
    id: order.id,
    status: order.status,
    approvalUrl,
    fundingSource,
  };
}

export async function captureOrder(orderId) {
  try {
    return await paypalFetch(`/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  } catch (error) {
    if (error.status === 422) {
      return getOrder(orderId);
    }
    throw error;
  }
}

export async function getOrder(orderId) {
  return paypalFetch(`/v2/checkout/orders/${orderId}`);
}
