import Vue from "vue";
import VueRouter from "vue-router";
import MainAppView from "../views/MainAppView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainAppView",
    component: MainAppView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
