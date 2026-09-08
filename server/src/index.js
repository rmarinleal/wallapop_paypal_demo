import { env } from "./env.js";
import { app } from "./app.js";

app.listen(env.port, () => {
  console.log(`Wallapop PayPal API listening on http://localhost:${env.port}`);
});
