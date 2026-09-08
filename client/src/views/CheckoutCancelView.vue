<template>
  <div class="page result">
    <section>
      <h1>Pago cancelado</h1>
      <p>Has cancelado el pago en PayPal y has vuelto a Wallapop. Puedes intentarlo de nuevo cuando quieras.</p>
      <router-link class="teal-btn back" to="/">Volver al listado</router-link>
    </section>
  </div>
</template>

<style scoped>
.result {
  display: grid;
  place-items: start center;
}

section {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  width: min(520px, 100%);
  margin-top: 40px;
}

.back {
  display: inline-block;
  text-align: center;
  margin-top: 16px;
  width: auto;
  padding-inline: 28px;
}
</style>
