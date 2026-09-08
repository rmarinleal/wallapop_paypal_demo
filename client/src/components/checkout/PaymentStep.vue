<script setup>
import { checkout, PAYMENT_METHODS } from "../../store/checkout.js";
import PayPalPayLaterMessage from "../PayPalPayLaterMessage.vue";
import PaymentLogos from "../icons/PaymentLogos.vue";
</script>

<template>
  <div>
    <div class="wallet">Cuando tengas saldo en el monedero, podrás pagar con él.</div>

    <div v-for="method in PAYMENT_METHODS" :key="method.id" class="method">
      <label
        class="option"
        :class="{ on: checkout.payment === method.id, later: method.id === 'paylater' }"
      >
        <template v-if="method.id === 'paylater'">
          <PayPalPayLaterMessage
            v-if="checkout.product"
            compact
            align="center"
            :amount="checkout.product.price"
          />
        </template>
        <template v-else>
          <PaymentLogos :names="method.logos" />
          <span>
            <strong>{{ method.label }}</strong>
          </span>
        </template>
        <input v-model="checkout.payment" type="radio" :value="method.id" />
      </label>
    </div>

    <p class="legal">
      Tu pago está encriptado y seguro. El vendedor no recibirá el pago hasta que
      confirmes que el producto recibido está en buen estado.
    </p>
  </div>
</template>

<style scoped>
.wallet {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px 14px;
  color: var(--muted);
  font-size: 14px;
  margin-bottom: 8px;
}

.method {
  border-bottom: 1px solid var(--line);
}

.option {
  display: grid;
  grid-template-columns: 72px 1fr 20px;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
}

.option.later {
  grid-template-columns: 1fr 20px;
}

.option.later :deep(.pp-later) {
  margin: 0;
}

.legal {
  color: var(--muted);
  font-size: 13px;
}

input[type="radio"] {
  accent-color: var(--teal);
  width: 18px;
  height: 18px;
}
</style>
