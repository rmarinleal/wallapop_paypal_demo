<script setup>
import { computed } from "vue";
import { addressLabel, checkout, money, selectedPayment, totals } from "../../store/checkout.js";
import PayPalPayLaterMessage from "../PayPalPayLaterMessage.vue";
import PaymentLogos from "../icons/PaymentLogos.vue";

const t = computed(() => totals());
</script>

<template>
  <div>
    <div class="row total">
      <span>Total</span>
      <strong>{{ money(t.total) }} €</strong>
    </div>
    <PayPalPayLaterMessage
      v-if="['paypal', 'paylater'].includes(checkout.payment)"
      compact
      :amount="t.total"
    />
    <p class="points">Tienes 0 puntos. Sigue acumulándolos para canjearlos en otra ocasión.</p>

    <div class="row">
      <span>
        <strong>Entrega estimada en 3-7 días</strong>
        <small>{{ checkout.delivery === "address" ? addressLabel() : "En persona" }}</small>
      </span>
      <button class="link" type="button" @click="checkout.step = 'delivery'">Editar</button>
    </div>

    <div class="row">
      <span class="pay">
        <PaymentLogos :names="selectedPayment?.logos || []" />
        <span>
          <small>Método de pago</small>
          <strong>{{ selectedPayment?.label }}</strong>
        </span>
      </span>
      <button class="link" type="button" @click="checkout.step = 'payment'">Editar</button>
    </div>

    <div class="row">
      <strong>Código promocional</strong>
      <button class="link" type="button">Añadir</button>
    </div>

    <p class="legal">
      Compra con seguridad, protegemos tus transacciones. Al realizar esta compra aceptas
      las Condiciones de uso y la Política de privacidad de Wallapop.
    </p>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid var(--line);
}

.total strong {
  color: var(--teal);
  font-size: 22px;
}

.points {
  background: #f4f6f7;
  border-radius: 10px;
  padding: 10px 12px;
  color: var(--muted);
  font-size: 13px;
}

small {
  display: block;
  color: var(--muted);
  margin-top: 4px;
}

.pay {
  display: flex;
  align-items: center;
  gap: 10px;
}

.legal {
  color: var(--muted);
  font-size: 13px;
}
</style>
