import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import About from "../components/about-component.vue";
import ContactUs from "../components/contact-us.vue";
import Home from "../components/home-component.vue";
import Login from "../components/login-component.vue";
import Logout from "../components/logout-component.vue";
import ListCards from "../components/list-cards.vue";
import WhatsNew from "../components/whats-new.vue";
import store from "../store";

const doDefault = () => (from: any, to: any, next: any) => {
  if (from.hash != null && from.hash.startsWith("#token=")) {
    next("/ListCards");
  } else next();
};

const goHome = () => (from: any, to: any, next: any) => {
  store.dispatch("loadToken");
  if (store.getters.isAuthenticated == true) {
    next("/ListCards");
  } else next();
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: (route) => ({ token: route.hash }),
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/contactUs",
    name: "contactUs",
    component: ContactUs,
  },
  {
    path: "/home",
    name: "home",
    component: Login,
    beforeEnter: goHome(),
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/ListCards",
    name: "listcards",
    component: ListCards,
  },
  {
    path: "/whatsnew",
    name: "whatsnew",
    component: WhatsNew,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "home",
    component: Home,
    beforeEnter: doDefault(),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
