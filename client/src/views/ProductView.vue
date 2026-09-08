<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import PayPalPayLaterMessage from "../components/PayPalPayLaterMessage.vue";
import { openCheckout } from "../store/checkout.js";

const route = useRoute();
const product = ref(null);
const error = ref("");

async function load() {
  error.value = "";
  product.value = null;
  const response = await fetch(`/api/products/${route.params.id}`);
  if (!response.ok) {
    error.value = "Producto no encontrado";
    return;
  }
  product.value = await response.json();
}

onMounted(load);
watch(() => route.params.id, load);
</script>

<template>
  <div class="page">
    <p v-if="error">{{ error }}</p>
    <div v-else-if="!product">Cargando…</div>
    <div v-else class="detail">
      <p class="crumbs">
        Inicio / Cine, Libros y Música / {{ product.location }} / {{ product.title }}
      </p>

      <div class="layout">
        <section>
          <div class="gallery">
            <img :src="product.image" :alt="product.title" />
          </div>
          <div class="tags">
            <span v-for="tag in product.tags" :key="tag">{{ tag }}</span>
          </div>
          <h2>Descripción</h2>
          <p>{{ product.description }}</p>
        </section>

        <aside class="buybox">
          <h1>{{ product.title }}</h1>
          <p class="meta">{{ product.condition }} · {{ product.extra }}</p>
          <p class="amount">{{ product.price }} €</p>
          <PayPalPayLaterMessage :amount="product.price" />
          <button class="teal-btn" type="button" @click="openCheckout(product)">
            Comprar
          </button>

          <div class="seller">
            <div>
              <strong>{{ product.seller.name }}</strong>
              <p>{{ product.seller.rating }} ★ · {{ product.seller.reviews }} valoraciones</p>
              <small v-if="product.seller.verified">Perfil Pro verificado</small>
            </div>
            <button class="ghost-btn" type="button">Chat</button>
          </div>

          <div class="shipbox">
            <div class="tabs">
              <span class="on">Con envío</span>
              <span>Venta en persona</span>
            </div>
            <p>Entrega estimada en 3-7 días desde {{ product.shipping.toFixed(2).replace(".", ",") }} €</p>
            <p class="muted">Protección Wallapop incluida.</p>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crumbs {
  color: var(--muted);
  font-size: 13px;
}

.layout {
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 28px;
}

.gallery {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  min-height: 360px;
}

.gallery img {
  width: 100%;
  height: 460px;
  object-fit: cover;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
}

.tags span {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 13px;
}

.buybox {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  height: fit-content;
}

.buybox h1 {
  margin: 0 0 8px;
  font-size: 22px;
}

.meta,
.muted {
  color: var(--muted);
}

.amount {
  font-size: 36px;
  font-weight: 700;
  margin: 8px 0 10px;
}

.seller,
.shipbox {
  margin-top: 16px;
  border-top: 1px solid var(--line);
  padding-top: 16px;
}

.seller {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.seller p,
.seller small {
  margin: 4px 0 0;
  color: var(--muted);
}

.tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 10px;
  font-weight: 600;
}

.tabs .on {
  color: var(--teal);
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
