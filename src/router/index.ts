import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import About from "../components/About.vue";
import ContactUs from "../components/ContactUs.vue";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Logout from "../components/Logout.vue";
import ListCards from "../components/ListCards.vue";
import store from "../store";

const doDefault = () => (from: any, to: any, next: any) => {
  if (from.hash != null && from.hash.startsWith("#token=")) {
    next("/ListCards");
  } else next();
};

const goHome = () => (from: any, to: any, next: any) => {
  store.dispatch("LOADTOKEN");
  if (store.getters.isAuthenticated == true) {
    next("/ListCards");
  } else next();
};

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
    props: (route) => ({ token: route.hash }),
  },
  {
    path: "/about",
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
    path: "/:pathMatch(.*)*",
    component: Home,
    beforeEnter: doDefault(),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
