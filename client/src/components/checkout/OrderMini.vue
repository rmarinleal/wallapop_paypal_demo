<script setup>
import { computed } from "vue";
import { checkout, money, totals } from "../../store/checkout.js";
import PayPalPayLaterMessage from "../PayPalPayLaterMessage.vue";

const t = computed(() => totals());
const showBanner = computed(
  () =>
    checkout.step === "payment" &&
    ["paypal", "paylater"].includes(checkout.payment),
);
</script>

<template>
  <div v-if="checkout.product" class="wrap">
    <div class="mini">
      <img :src="checkout.product.image" :alt="checkout.product.title" />
      <div>
        <p>{{ checkout.product.title }}: {{ money(t.item) }} €</p>
        <p>Protección Wallapop: {{ money(t.protection) }} €</p>
        <p>Envío: {{ money(t.shipping) }} €</p>
        <strong>Total: {{ money(t.total) }} €</strong>
      </div>
    </div>
    <PayPalPayLaterMessage
      v-if="showBanner"
      compact
      :amount="t.total"
    />
  </div>
</template>

<style scoped>
.wrap {
  margin: 16px 0;
}

.mini {
  display: flex;
  gap: 14px;
  background: #f4f6f7;
  border-radius: 12px;
  padding: 12px;
}

.mini img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
}

.mini p {
  margin: 0 0 4px;
  font-size: 14px;
}

.mini strong {
  font-size: 16px;
}
</style>
