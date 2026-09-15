<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import { loadPaypalSdk } from "../lib/paypalSdk.js";

const props = defineProps({
  amount: { type: [Number, String], required: true },
  compact: { type: Boolean, default: false },
  align: { type: String, default: "left" },
});

const host = ref(null);
const failed = ref(false);

async function renderMessage() {
  failed.value = false;
  if (props.amount == null || Number(props.amount) <= 0) return;
  await nextTick();
  if (!host.value) return;

  try {
    const paypal = await loadPaypalSdk();
    host.value.innerHTML = "";
    await paypal
      .Messages({
        amount: Number(props.amount).toFixed(2),
        currency: "EUR",
        placement: "product",
        style: {
          layout: "text",
          logo: { type: "primary" },
          text: { color: "black", size: "12", align: props.align },
        },
      })
      .render(host.value);
  } catch (error) {
    console.error(error);
    failed.value = true;
  }
}

onMounted(renderMessage);
watch(() => [props.amount, props.align], renderMessage);
</script>

<template>
  <div class="pp-later" :class="{ compact }">
    <div ref="host" class="pp-later-host"></div>
    <p v-if="failed" class="fallback">PayPal Paylater no disponible.</p>
  </div>
</template>

<style scoped>
.pp-later {
  margin: 0 0 16px;
  min-height: 24px;
}

.pp-later.compact {
  margin: 8px 0 0;
}

.pp-later-host {
  min-height: 20px;
}

.fallback {
  margin: 0;
  font-size: 13px;
  color: var(--muted);
}
</style>
