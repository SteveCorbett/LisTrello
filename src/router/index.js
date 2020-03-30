import Vue from "vue";
import VueRouter from "vue-router";

import About from "../components/About";
import ContactUs from "../components/ContactUs";
import Home from "../components/Home";
import Login from "../components/Login";
import Logout from "../components/Logout";
import ListCards from "../components/ListCards";
import store from "../store";

Vue.use(VueRouter);

const doDefault = () => (from, to, next) => {
  console.log("DoDefault", from);
  console.log(window.location);
  if (from.hash != null && from.hash.startsWith("#token=")) {
    console.log("Set token = " + from.hash.substr(7));
    next("/ListCards");
  } else next();
};

const goHome = () => (from, to, next) => {
  store.dispatch("LOADTOKEN");
  if (store.getters.isAuthenticated == true) {
    next("/ListCards");
  } else next("login");
};

// Initial route checks if a token exists and if so,
// goes to the select board.
// If not, display a screen saying "log on to Trello"
// On return from said Trello, go to the select board.

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
      props: route => ({ token: route.hash })
    },
    {
      path: "/about",
      component: About
    },
    {
      path: "/contactUs",
      name: "contactUs",
      component: ContactUs
    },
    {
      path: "/home",
      name: "home",
      component: Login,
      beforeEnter: goHome()
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    },
    {
      path: "/ListCards",
      name: "listcards",
      component: ListCards
    },
    {
      path: "*",
      component: Home,
      beforeEnter: doDefault()
    }
  ]
});
