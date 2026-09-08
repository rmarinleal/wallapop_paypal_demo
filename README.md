# Demo Wallapop + PayPal Paylater

Clon del flujo de compra de Wallapop con un método extra **PayPal Paylater** que redirige a PayPal con `fundingSource=paylater`.

## Puertos

- Frontend Vue: [http://localhost:8011](http://localhost:8011)
- Backend Express: [http://localhost:8012](http://localhost:8012)

## Configurar la cuenta de comercio

1. Crea una app en el [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications) (Sandbox).
2. Copia `.env.example` a `.env` y pega el Client ID y el Secret:

```bash
cp .env.example .env
```

```
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_ENV=sandbox
PAYPAL_URL=https://api-m.sandbox.paypal.com
PAYPAL_CURRENCY=EUR
PAYPAL_BRAND_NAME=Wallapop
PORT=8012
CLIENT_ORIGIN=http://localhost:8011
```

El secret nunca se envía al navegador. `GET /api/config` solo expone `clientId`, `env` y `currency`.

## Arrancar

```bash
cd server && npm install && npm run dev
cd client && npm install && npm run dev
```

## Flujo

Listado → producto → **Comprar** → Entrega → Pago → Resumen → redirect a PayPal.

En Pago, **PayPal Paylater** crea la orden y abre:

`https://www.sandbox.paypal.com/checkoutnow?token={ORDER_ID}&fundingSource=paylater`

Pay Later en España (Paga en 3 plazos) depende de que la app de comercio y el comprador sandbox sean elegibles.
