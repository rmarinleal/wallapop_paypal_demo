<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { formatPaypalAmount, loadPaypalSdk } from "../lib/paypalSdk.js";

const props = defineProps({
  amount: { type: [Number, String], required: true },
  compact: { type: Boolean, default: false },
  align: { type: String, default: "left" },
  placement: { type: String, default: "product" },
});

const host = ref(null);
const failed = ref(false);
const formatted = computed(() => formatPaypalAmount(props.amount));

async function renderMessage() {
  failed.value = false;
  if (Number(formatted.value) <= 0) return;
  await nextTick();
  if (!host.value) return;

  try {
    const paypal = await loadPaypalSdk();
    await nextTick();
    if (!host.value) return;

    host.value.setAttribute("data-pp-amount", formatted.value);
    await paypal
      .Messages({
        amount: formatted.value,
        currency: "EUR",
        placement: props.placement,
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
watch(
  () => [formatted.value, props.align, props.placement],
  () => {
    renderMessage();
  },
);
</script>

<template>
  <div class="pp-later" :class="{ compact }">
    <div
      ref="host"
      class="pp-later-host"
      data-pp-message
      :data-pp-amount="formatted"
      :data-pp-placement="placement"
      data-pp-style-layout="text"
      data-pp-style-logo-type="primary"
      data-pp-style-text-color="black"
      data-pp-style-text-size="12"
    ></div>
    <p v-if="failed" class="fallback">PayPal Paylater no disponible.</p>
  </div>
</template>

<style scoped>
.pp-later {
  margin: 0 0 16px;
  min-height: 28px;
  width: 100%;
}

.pp-later.compact {
  margin: 10px 0 0;
}

.pp-later-host {
  min-height: 24px;
  width: 100%;
}

.pp-later-host :deep(iframe) {
  max-width: 100%;
}

.fallback {
  margin: 0;
  font-size: 13px;
  color: var(--muted);
}
</style>
