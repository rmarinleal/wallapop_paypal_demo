import { createRouter, createWebHistory } from "vue-router";
import ListingView from "./views/ListingView.vue";
import ProductView from "./views/ProductView.vue";
import CheckoutSuccessView from "./views/CheckoutSuccessView.vue";
import CheckoutCancelView from "./views/CheckoutCancelView.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "listing", component: ListingView },
    { path: "/item/:id", name: "product", component: ProductView },
    { path: "/checkout/success", name: "success", component: CheckoutSuccessView },
    { path: "/checkout/cancel", name: "cancel", component: CheckoutCancelView },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});
