<script setup>
import { computed } from "vue";
import { checkout, money, totals } from "../../store/checkout.js";
import PayPalPayLaterMessage from "../PayPalPayLaterMessage.vue";

const t = computed(() => totals());
const showBanner = computed(
  () => checkout.step === "payment" && checkout.payment === "paylater",
);
</script>

<template>
  <div v-if="checkout.product" class="mini">
    <div class="line">
      <img :src="checkout.product.image" :alt="checkout.product.title" />
      <div class="details">
        <p>{{ checkout.product.title }}: {{ money(t.item) }} €</p>
        <p>Protección Wallapop: {{ money(t.protection) }} €</p>
        <p>Envío: {{ money(t.shipping) }} €</p>
        <strong>Total: {{ money(t.total) }} €</strong>
        <PayPalPayLaterMessage
          v-if="showBanner"
          :key="`pay-mini-${t.total}`"
          compact
          placement="payment"
          :amount="t.total"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.mini {
  background: #f4f6f7;
  border-radius: 12px;
  padding: 12px;
  margin: 16px 0;
}

.line {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.line img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.details {
  min-width: 0;
  flex: 1;
}

.line p {
  margin: 0 0 4px;
  font-size: 14px;
}

.line strong {
  font-size: 16px;
}
</style>
