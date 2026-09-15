<script setup>
import { checkout, paymentMethods } from "../../store/checkout.js";
import PaymentLogos from "../icons/PaymentLogos.vue";
</script>

<template>
  <div>
    <div class="wallet">Cuando tengas saldo en el monedero, podrás pagar con él.</div>

    <label
      v-for="method in paymentMethods"
      :key="method.id"
      class="option"
      :class="{ on: checkout.payment === method.id }"
    >
      <PaymentLogos :names="method.logos" />
      <span>
        <strong>{{ method.label }}</strong>
      </span>
      <input v-model="checkout.payment" type="radio" :value="method.id" />
    </label>

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

.option {
  display: grid;
  grid-template-columns: 72px 1fr 20px;
  align-items: center;
  gap: 8px;
  min-height: 56px;
  height: 56px;
  padding: 0;
  border-bottom: 1px solid var(--line);
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
