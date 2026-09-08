<script setup>
import AppHeader from "./components/AppHeader.vue";
import CheckoutFlow from "./components/checkout/CheckoutFlow.vue";
</script>

<template>
  <AppHeader />
  <main>
    <router-view />
  </main>
  <CheckoutFlow />
</template>
