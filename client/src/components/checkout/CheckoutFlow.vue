<script setup>
import {
  checkout,
  closeCheckout,
  continueFromDelivery,
  continueFromPayment,
  continueFromSummary,
  goBack,
  startPaypalRedirect,
} from "../../store/checkout.js";
import DeliveryStep from "./DeliveryStep.vue";
import PaymentStep from "./PaymentStep.vue";
import SummaryStep from "./SummaryStep.vue";
import RedirectStep from "./RedirectStep.vue";
import OrderMini from "./OrderMini.vue";

const titles = {
  delivery: "Entrega",
  payment: "Pago",
  summary: "Resumen",
  redirect: "Resumen",
};

function primaryAction() {
  if (checkout.step === "delivery") continueFromDelivery();
  else if (checkout.step === "payment") continueFromPayment();
  else if (checkout.step === "summary") continueFromSummary();
  else startPaypalRedirect();
}

const labels = {
  delivery: "Continuar",
  payment: "Continuar",
  summary: "Comprar",
  redirect: "Continuar",
};
</script>

<template>
  <div v-if="checkout.open" class="overlay" @click.self="closeCheckout">
    <section class="modal" role="dialog" aria-modal="true">
      <header>
        <button class="icon" type="button" aria-label="Atrás" @click="goBack">←</button>
        <h2>{{ titles[checkout.step] }}</h2>
        <div class="right">
          <button class="link" type="button">¿Dudas?</button>
          <button class="icon" type="button" aria-label="Cerrar" @click="closeCheckout">×</button>
        </div>
      </header>

      <div class="body">
        <DeliveryStep v-if="checkout.step === 'delivery'" />
        <PaymentStep v-else-if="checkout.step === 'payment'" />
        <SummaryStep v-else-if="checkout.step === 'summary'" />
        <RedirectStep v-else />

        <OrderMini v-if="checkout.step === 'delivery' || checkout.step === 'payment'" />
        <p v-if="checkout.notice" class="notice">{{ checkout.notice }}</p>

        <button
          v-if="checkout.step !== 'redirect'"
          class="teal-btn"
          type="button"
          :disabled="checkout.loading"
          @click="primaryAction"
        >
          {{ labels[checkout.step] }}
        </button>
        <template v-else>
          <button class="teal-btn" type="button" :disabled="checkout.loading" @click="startPaypalRedirect">
            {{ checkout.loading ? "Redirigiendo…" : "Continuar" }}
          </button>
          <button class="text-cancel" type="button" :disabled="checkout.loading" @click="closeCheckout">
            Cancelar
          </button>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(20, 24, 28, 0.55);
  display: grid;
  place-items: center;
  z-index: 20;
  padding: 16px;
}

.modal {
  width: min(520px, 100%);
  background: #fff;
  border-radius: 20px;
  box-shadow: var(--shadow);
  max-height: calc(100vh - 32px);
  overflow: auto;
}

header {
  display: grid;
  grid-template-columns: 40px 1fr auto;
  align-items: center;
  padding: 16px 18px 8px;
}

h2 {
  margin: 0;
  text-align: center;
  font-size: 20px;
}

.right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  border: 0;
  background: transparent;
  font-size: 22px;
  width: 36px;
  height: 36px;
}

.body {
  padding: 8px 22px 24px;
}

.notice {
  color: var(--danger);
  font-size: 14px;
}

.text-cancel {
  display: block;
  width: 100%;
  margin-top: 10px;
  border: 0;
  background: transparent;
  color: var(--muted);
  font-weight: 600;
}
</style>
