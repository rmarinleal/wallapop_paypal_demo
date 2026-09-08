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
    <img
      v-if="names.includes('paypal')"
      class="paypal"
      src="/paypal-logo.png"
      alt="PayPal"
      width="36"
      height="36"
    />
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

.paypal {
  width: 36px;
  height: 36px;
  object-fit: contain;
}
</style>
