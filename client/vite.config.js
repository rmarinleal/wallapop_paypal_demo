import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8011,
    strictPort: true,
    proxy: {
      "/api": "http://localhost:8012",
    },
  },
});
