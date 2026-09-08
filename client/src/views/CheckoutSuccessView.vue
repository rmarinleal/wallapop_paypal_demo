<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const status = ref("loading");
const message = ref("Confirmando el pago con PayPal…");
const order = ref(null);

onMounted(async () => {
  const token = route.query.token;
  if (!token) {
    status.value = "error";
    message.value = "No hemos recibido el identificador del pago.";
    return;
  }

  try {
    const response = await fetch("/api/orders/capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: token }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "No se pudo capturar el pago");
    }
    order.value = data;
    const captured = data.status === "COMPLETED" || data.status === "APPROVED";
    status.value = captured ? "ok" : "pending";
    message.value = captured
      ? "Pago completado. El vendedor preparará el envío cuando confirmes la recepción."
      : `El pago quedó en estado ${data.status}.`;
  } catch (error) {
    status.value = "error";
    message.value = error.message;
  }
});
</script>

<template>
  <div class="page result">
    <section>
      <h1 v-if="status === 'ok'">Compra realizada</h1>
      <h1 v-else-if="status === 'error'">No se pudo completar el pago</h1>
      <h1 v-else>Procesando pago</h1>
      <p>{{ message }}</p>
      <p v-if="order?.id" class="ref">Referencia PayPal: {{ order.id }}</p>
      <router-link class="teal-btn back" to="/">Volver al listado</router-link>
    </section>
  </div>
</template>

<style scoped>
.result {
  display: grid;
  place-items: start center;
}

section {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  width: min(520px, 100%);
  margin-top: 40px;
}

.ref {
  color: var(--muted);
  font-size: 14px;
}

.back {
  display: inline-block;
  text-align: center;
  margin-top: 16px;
  width: auto;
  padding-inline: 28px;
}
</style>
