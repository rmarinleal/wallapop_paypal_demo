<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const products = ref([]);
const loading = ref(true);

onMounted(async () => {
  const response = await fetch("/api/products");
  products.value = await response.json();
  loading.value = false;
});

const filtered = computed(() => {
  const q = String(route.query.q || "").toLowerCase();
  if (!q) return products.value;
  return products.value.filter((item) =>
    `${item.title} ${item.category} ${item.tags.join(" ")}`.toLowerCase().includes(q),
  );
});
</script>

<template>
  <div class="page listing">
    <aside class="filters">
      <h3>Categorías</h3>
      <p class="current">Cine, libros y música</p>
      <ul>
        <li>Cine y series</li>
        <li>Libros, cómics y revistas</li>
        <li>Música</li>
      </ul>

      <h3>Ubicación</h3>
      <p>Madrid Centro, Madrid, ESP</p>
      <button class="link" type="button">Cambiar</button>

      <h3>Opciones de envío</h3>
      <label class="toggle">
        <input type="checkbox" checked />
        Envío
      </label>

      <h3>Fecha de publicación</h3>
      <label><input type="radio" name="date" checked /> Todas</label>
      <label><input type="radio" name="date" /> Últimos 7 días</label>
      <label><input type="radio" name="date" /> Últimos 30 días</label>

      <h3>Precio</h3>
      <p>0 € – 20.000 €</p>

      <h3>Estado</h3>
      <label><input type="checkbox" checked /> Nuevo</label>
      <label><input type="checkbox" checked /> Como nuevo</label>
    </aside>

    <section>
      <div class="toolbar">
        <h1>Encuentra lo que buscas</h1>
        <button class="ghost-btn" type="button">Ordenar por: Distancia</button>
      </div>

      <p v-if="loading">Cargando productos…</p>
      <div v-else class="grid">
        <router-link
          v-for="item in filtered"
          :key="item.id"
          :to="`/item/${item.id}`"
          class="card"
        >
          <div class="thumb">
            <img :src="item.image" :alt="item.title" />
            <span class="ship">Envío disponible</span>
          </div>
          <strong>{{ item.price }} €</strong>
          <p>{{ item.title }}</p>
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.listing {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 28px;
}

.filters {
  background: #fff;
  border-radius: 12px;
  padding: 18px;
  color: var(--muted);
  font-size: 14px;
}

.filters h3 {
  margin: 18px 0 8px;
  color: var(--ink);
  font-size: 15px;
}

.filters h3:first-child {
  margin-top: 0;
}

.filters ul {
  margin: 0;
  padding-left: 16px;
}

.filters label {
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 6px 0;
}

.current {
  color: var(--teal);
  font-weight: 700;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.toolbar h1 {
  margin: 0;
  font-size: 28px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.card strong {
  display: block;
  padding: 12px 12px 0;
  font-size: 18px;
}

.card p {
  margin: 6px 12px 14px;
  color: var(--muted);
  font-size: 14px;
}

.thumb {
  position: relative;
  aspect-ratio: 1;
  background: #eee;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ship {
  position: absolute;
  left: 8px;
  bottom: 8px;
  background: #fff;
  color: var(--purple);
  font-size: 11px;
  font-weight: 700;
  border-radius: 999px;
  padding: 4px 8px;
}

@media (max-width: 980px) {
  .listing {
    grid-template-columns: 1fr;
  }
  .filters {
    display: none;
  }
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
