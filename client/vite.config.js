import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8011,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:8012",
        changeOrigin: false,
        headers: {
          "x-forwarded-host": "localhost:8011",
          "x-forwarded-proto": "http",
        },
      },
    },
  },
});
