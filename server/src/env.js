import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

function required(name) {
  return process.env[name]?.trim() || "";
}

function strip(value) {
  return String(value || "")
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\/$/, "");
}

export const env = {
  paypalClientId: required("PAYPAL_CLIENT_ID"),
  paypalClientSecret: required("PAYPAL_CLIENT_SECRET"),
  paypalEnv: (process.env.PAYPAL_ENV || "sandbox").toLowerCase(),
  paypalUrl: strip(process.env.PAYPAL_URL),
  currency: process.env.PAYPAL_CURRENCY || "EUR",
  brandName: process.env.PAYPAL_BRAND_NAME || "Demo site: wallapop",
  port: Number(process.env.PORT) || 8012,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:8011",
};

export function isLive() {
  return env.paypalEnv === "live";
}

export function paypalApiBase() {
  if (env.paypalUrl) return env.paypalUrl;
  return isLive() ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
}

export function paypalCheckoutBase() {
  return isLive() ? "https://www.paypal.com" : "https://www.sandbox.paypal.com";
}
