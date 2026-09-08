<template>
  <div class="demo" role="status">
    <strong>DEMO</strong>
    <span>
      Sitio de prueba no oficial para integrar PayPal Paylater. No está afiliado
      a Wallapop ni es un marketplace real.
    </span>
  </div>
</template>

<style scoped>
.demo {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 8px 16px;
  background: #1b2430;
  color: #fff;
  font-size: 13px;
  line-height: 1.35;
  text-align: center;
}

.demo strong {
  background: #ffc107;
  color: #1b2430;
  border-radius: 4px;
  padding: 2px 7px;
  font-size: 11px;
  letter-spacing: 0.04em;
}

@media (max-width: 700px) {
  .demo {
    font-size: 12px;
    justify-content: flex-start;
    text-align: left;
  }
}
</style>
