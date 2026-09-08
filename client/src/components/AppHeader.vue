<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import WallapopLogo from "./icons/WallapopLogo.vue";

const router = useRouter();
const query = ref("");

function search() {
  router.push({ name: "listing", query: query.value ? { q: query.value } : {} });
}
</script>

<template>
  <header class="header">
    <div class="header-main">
      <router-link to="/" class="brand" aria-label="Wallapop">
        <WallapopLogo />
      </router-link>

      <form class="search" @submit.prevent="search">
        <input v-model="query" type="search" placeholder="Buscar en Wallapop" />
        <button type="submit" aria-label="Buscar">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
        </button>
      </form>

      <nav class="actions">
        <span>Favoritos</span>
        <span>Buzón</span>
        <span>Tú</span>
        <button class="sell" type="button">+ Vender</button>
      </nav>
    </div>

    <nav class="cats">
      <router-link to="/">Todas las categorías</router-link>
      <router-link to="/" class="active">Cine, libros y música</router-link>
      <span>Inmobiliaria</span>
      <span>Moda y accesorios</span>
      <span>Tecnología y electrónica</span>
      <span>Coches</span>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background: #fff;
  border-bottom: 1px solid var(--line);
}

.header-main {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 24px;
  align-items: center;
  padding: 14px 0;
}

.search {
  display: flex;
  align-items: center;
  background: #f4f6f7;
  border-radius: 999px;
  padding: 4px 4px 4px 16px;
}

.search input {
  flex: 1;
  border: 0;
  background: transparent;
  outline: none;
  padding: 10px 0;
}

.search button {
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--muted);
}

.actions {
  display: flex;
  align-items: center;
  gap: 18px;
  color: var(--muted);
  font-size: 14px;
  font-weight: 600;
}

.sell {
  border: 0;
  background: var(--teal);
  color: #fff;
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 700;
}

.cats {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
  display: flex;
  gap: 22px;
  padding: 0 0 12px;
  color: var(--muted);
  font-size: 14px;
}

.cats .active,
.cats a:hover {
  color: var(--ink);
  font-weight: 600;
}

@media (max-width: 800px) {
  .header-main {
    grid-template-columns: 1fr;
  }
  .actions,
  .cats {
    display: none;
  }
}
</style>
