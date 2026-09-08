import express from "express";
import cors from "cors";
import { env } from "./env.js";
import { computeTotals, getProduct, products } from "./products.js";
import { captureOrder, createOrder, getOrder } from "./paypal.js";

const app = express();

app.use(
  cors({
    origin: env.clientOrigin,
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/config", (_req, res) => {
  res.json({
    clientId: env.paypalClientId,
    env: env.paypalEnv,
    currency: env.currency,
    brandName: env.brandName,
  });
});

app.get("/api/products", (_req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = getProduct(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(product);
});

app.post("/api/orders", async (req, res) => {
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
    const origin = env.clientOrigin.replace(/\/$/, "");
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

app.post("/api/orders/capture", async (req, res) => {
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

app.get("/api/orders/:id", async (req, res) => {
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

app.listen(env.port, () => {
  console.log(`Wallapop PayPal API listening on http://localhost:${env.port}`);
});
