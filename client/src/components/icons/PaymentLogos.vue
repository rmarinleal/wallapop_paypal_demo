<script setup>
defineProps({
  names: { type: Array, default: () => [] },
});
</script>

<template>
  <span class="logos">
    <span v-if="names.includes('visa')" class="chip visa">VISA</span>
    <span v-if="names.includes('mastercard')" class="mc" aria-label="Mastercard">
      <i></i><i></i>
    </span>
    <span v-if="names.includes('bizum')" class="chip bizum">bizum</span>
    <span v-if="names.includes('klarna')" class="chip klarna">Klarna</span>
    <span v-if="names.includes('paypal')" class="paypal" aria-label="PayPal">
      <svg viewBox="0 0 24 24" width="28" height="28">
        <path
          fill="#003087"
          d="M7.2 20.4h1.8l.5-3.1h1.7c2.8 0 4.3-1.3 4.7-3.8.5-2.6-.7-4.1-3.3-4.1H8.6L7.2 20.4z"
        />
        <path
          fill="#009cde"
          d="M8.8 9.4h4.1c1.8 0 2.8.7 2.6 2.4-.3 2.1-1.6 3.3-3.8 3.3H9.8l.5-3.1.6-2.6z"
        />
      </svg>
    </span>
  </span>
</template>

<style scoped>
.logos {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.chip {
  font-size: 11px;
  font-weight: 800;
  border-radius: 4px;
  padding: 3px 6px;
  line-height: 1;
}

.visa {
  background: #1a237e;
  color: #fff;
}

.bizum {
  background: #00b0c7;
  color: #fff;
  text-transform: lowercase;
}

.klarna {
  background: #ffb3c7;
  color: #0a0a0a;
}

.mc {
  width: 28px;
  height: 18px;
  position: relative;
}

.mc i {
  position: absolute;
  top: 1px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.mc i:first-child {
  left: 0;
  background: #eb001b;
}

.mc i:last-child {
  right: 0;
  background: #f79e1b;
  opacity: 0.92;
}
</style>
