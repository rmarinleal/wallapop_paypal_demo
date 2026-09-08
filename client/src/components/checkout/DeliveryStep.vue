<script setup>
import { checkout, addressLabel } from "../../store/checkout.js";
</script>

<template>
  <div>
    <label class="option" :class="{ on: checkout.delivery === 'address' }">
      <span class="ico">⌂</span>
      <span>
        <strong>Mi dirección {{ checkout.product?.shipping.toFixed(2).replace(".", ",") }} €</strong>
        <small>Entrega estimada en 3-7 días</small>
        <small>{{ addressLabel() }}</small>
        <button class="ghost-btn" type="button">Editar dirección</button>
      </span>
      <input v-model="checkout.delivery" type="radio" value="address" />
    </label>

    <label class="option" :class="{ on: checkout.delivery === 'pickup' }">
      <span class="ico">☺</span>
      <span>
        <strong>En persona</strong>
        <small>Quedáis y pagáis al recoger el producto.</small>
      </span>
      <input v-model="checkout.delivery" type="radio" value="pickup" />
    </label>

    <p class="legal">Los envíos están protegidos con la política de protección de Wallapop.</p>
  </div>
</template>

<style scoped>
.option {
  display: grid;
  grid-template-columns: 28px 1fr 20px;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid var(--line);
  align-items: start;
}

.option.on strong {
  color: var(--ink);
}

.ico {
  font-size: 20px;
}

small {
  display: block;
  color: var(--muted);
  margin-top: 4px;
}

.ghost-btn {
  margin-top: 10px;
}

.legal {
  color: var(--muted);
  font-size: 13px;
}

input[type="radio"] {
  accent-color: var(--teal);
  width: 18px;
  height: 18px;
  margin-top: 4px;
}
</style>
