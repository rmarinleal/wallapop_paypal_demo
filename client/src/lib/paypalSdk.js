let pending = null;

export async function loadPaypalSdk() {
  if (window.paypal?.Messages) return window.paypal;
  if (pending) return pending;

  pending = (async () => {
    const response = await fetch("/api/config");
    const config = await response.json();
    if (!config.clientId) {
      throw new Error("Falta PAYPAL_CLIENT_ID para el SDK de PayPal");
    }

    const params = new URLSearchParams({
      "client-id": config.clientId,
      components: "messages",
      currency: config.currency || "EUR",
      locale: "es_ES",
      "enable-funding": "paylater",
    });

    if (config.env === "sandbox") {
      params.set("buyer-country", "ES");
    }

    await new Promise((resolve, reject) => {
      const existing = document.querySelector("script[data-paypal-sdk]");
      if (existing) {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () =>
          reject(new Error("No se pudo cargar el SDK de PayPal")),
        );
        if (window.paypal?.Messages) resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?${params}`;
      script.async = true;
      script.dataset.paypalSdk = "true";
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error("No se pudo cargar el SDK de PayPal"));
      document.head.appendChild(script);
    });

    if (!window.paypal?.Messages) {
      throw new Error("El SDK de PayPal no expone Messages");
    }
    return window.paypal;
  })().catch((error) => {
    pending = null;
    throw error;
  });

  return pending;
}
