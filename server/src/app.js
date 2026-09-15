import express from "express";
import cors from "cors";
import { env } from "./env.js";
import { computeTotals, getProduct, products } from "./products.js";
import { captureOrder, createOrder, getOrder } from "./paypal.js";

export function publicOrigin(req) {
  if (process.env.VERCEL) {
    const proto = (req.headers["x-forwarded-proto"] || "https")
      .toString()
      .split(",")[0]
      .trim();
    const host = (req.headers["x-forwarded-host"] || req.headers.host || "")
      .toString()
      .split(",")[0]
      .trim();
    if (host) return `${proto}://${host}`;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  }

  return env.clientOrigin.replace(/\/$/, "");
}

export const app = express();
app.set("trust proxy", true);

app.use(
  cors({
    origin: true,
  }),
);
app.use(express.json());

// Vercel serves api/[...path] with url "/products/:id" (without /api).
app.use((req, _res, next) => {
  const raw = req.url || "/";
  const q = raw.indexOf("?");
  const path = q === -1 ? raw : raw.slice(0, q);
  const search = q === -1 ? "" : raw.slice(q);
  if (
    path === "/health" ||
    path === "/config" ||
    path === "/products" ||
    path.startsWith("/products/") ||
    path === "/orders" ||
    path.startsWith("/orders/")
  ) {
    req.url = `/api${path}${search}`;
  }
  next();
});

app.get(["/checkout/success", "/checkout/cancel"], (req, res) => {
  const origin = publicOrigin(req);
  const query = new URLSearchParams(req.query).toString();
  res.redirect(302, `${origin}${req.path}${query ? `?${query}` : ""}`);
});

function sendProduct(req, res) {
  const product = getProduct(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(product);
}

app.get(["/api/health", "/health"], (_req, res) => {
  res.json({ ok: true });
});

app.get(["/api/config", "/config"], (_req, res) => {
  res.json({
    clientId: env.paypalClientId,
    env: env.paypalEnv,
    apiUrl: env.paypalUrl || undefined,
    currency: env.currency,
    brandName: env.brandName,
  });
});

app.get(["/api/products", "/products"], (_req, res) => {
  res.json(products);
});

app.get(["/api/products/:id", "/products/:id"], sendProduct);

app.post(["/api/orders", "/orders"], async (req, res) => {
  try {
    const { productId, fundingSource = "paypal", delivery = "address" } =
      req.body || {};

    if (!["paypal", "paylater"].includes(fundingSource)) {
      return res.status(400).json({
        error: "fundingSource debe ser paypal o paylater",
      });
    }

    const product = getProduct(productId);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const totals = computeTotals(product, delivery);
    const origin = publicOrigin(req);
    const created = await createOrder({
      product,
      totals,
      fundingSource,
      returnUrl: `${origin}/checkout/success`,
      cancelUrl: `${origin}/checkout/cancel`,
    });

    res.json(created);
  } catch (error) {
    console.error("create order failed", error.details || error);
    res.status(error.status || 500).json({
      error: error.message,
      details: error.details || null,
    });
  }
});

app.post(["/api/orders/capture", "/orders/capture"], async (req, res) => {
  try {
    const orderId = req.body?.orderId || req.body?.token;
    if (!orderId) {
      return res.status(400).json({ error: "Falta orderId" });
    }
    const captured = await captureOrder(orderId);
    res.json(captured);
  } catch (error) {
    console.error("capture order failed", error.details || error);
    res.status(error.status || 500).json({
      error: error.message,
      details: error.details || null,
    });
  }
});

app.get(["/api/orders/:id", "/orders/:id"], async (req, res) => {
  try {
    const order = await getOrder(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(error.status || 500).json({
      error: error.message,
      details: error.details || null,
    });
  }
});
