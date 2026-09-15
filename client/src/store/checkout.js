import { computed, reactive } from "vue";

const ADDRESS = "Calle de Fuencarral 78, 3º B, 28004 Madrid, España";

export const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Tarjeta bancaria",
    demoOnly: true,
    logos: ["visa", "mastercard"],
  },
  {
    id: "bizum",
    label: "Bizum",
    demoOnly: true,
    logos: ["bizum"],
  },
  {
    id: "paypal",
    label: "PayPal",
    fundingSource: "paypal",
    logos: ["paypal"],
  },
  {
    id: "paylater",
    label: "PayPal Paga en 3 plazos",
    fundingSource: "paylater",
    logos: ["paypal"],
  },
];

export const checkout = reactive({
  open: false,
  step: "delivery",
  product: null,
  delivery: "address",
  payment: "paylater",
  notice: "",
  loading: false,
});

export function paylaterLabel(price = checkout.product?.price) {
  return Number(price) > 200
    ? "PayPal Paga en hasta 24 plazos"
    : "PayPal Paga en 3 plazos";
}

export const paymentMethods = computed(() =>
  PAYMENT_METHODS.map((method) =>
    method.id === "paylater"
      ? { ...method, label: paylaterLabel() }
      : method,
  ),
);

export const selectedPayment = computed(() =>
  paymentMethods.value.find((method) => method.id === checkout.payment),
);

export function money(value) {
  return Number(value).toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function totals() {
  const product = checkout.product;
  if (!product) {
    return { item: 0, protection: 0, shipping: 0, total: 0 };
  }
  const shipping = checkout.delivery === "address" ? product.shipping : 0;
  return {
    item: product.price,
    protection: product.protection,
    shipping,
    total: product.price + product.protection + shipping,
  };
}

export function addressLabel() {
  return ADDRESS;
}

export function openCheckout(product) {
  checkout.product = product;
  checkout.step = "delivery";
  checkout.delivery = "address";
  checkout.payment = "paylater";
  checkout.notice = "";
  checkout.loading = false;
  checkout.open = true;
}

export function closeCheckout() {
  checkout.open = false;
  checkout.notice = "";
  checkout.loading = false;
}

export function goBack() {
  if (checkout.step === "payment") checkout.step = "delivery";
  else if (checkout.step === "summary") checkout.step = "payment";
  else if (checkout.step === "redirect") checkout.step = "summary";
  else closeCheckout();
}

export function continueFromDelivery() {
  checkout.notice = "";
  checkout.step = "payment";
}

export function continueFromPayment() {
  const method = selectedPayment.value;
  if (!method || method.demoOnly) {
    checkout.notice =
      "Este método no está disponible en el demo. Elige PayPal o PayPal Paga en plazos.";
    return;
  }
  checkout.notice = "";
  checkout.step = "summary";
}

export function continueFromSummary() {
  checkout.notice = "";
  checkout.step = "redirect";
}

export async function startPaypalRedirect() {
  const method = selectedPayment.value;
  if (!method?.fundingSource || !checkout.product) return;

  checkout.loading = true;
  checkout.notice = "";
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: checkout.product.id,
        fundingSource: method.fundingSource,
        delivery: checkout.delivery,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "No se pudo crear el pago");
    }
    window.location.href = data.approvalUrl;
  } catch (error) {
    checkout.loading = false;
    checkout.notice = error.message;
  }
}
