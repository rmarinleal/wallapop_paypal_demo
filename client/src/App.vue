<script setup>
import AppHeader from "./components/AppHeader.vue";
import CheckoutFlow from "./components/checkout/CheckoutFlow.vue";
import DemoBanner from "./components/DemoBanner.vue";
</script>

<template>
  <DemoBanner />
  <AppHeader />
  <main>
    <router-view />
  </main>
  <CheckoutFlow />
</template>
