import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../components/Home";
import Login from "../components/Login";
import ListCards from "../components/ListCards";
import store from "../store";

Vue.use(VueRouter);

const requireAuth = () => (from, to, next) => {
  console.log("requireAuth", from);
  if (!store.state.trelloUserToken) {
    next("/login");
  }
  else next();
};

const doDefault = () => (from, to, next) => {
  console.log("DoDefault", from);
  if (from.hash != null && from.hash.startsWith("#token=")) {
    console.log("Set token = " + from.hash.substr(7));
    next("/ListCards");
  } else next();
};

// Initial route needs to check if token exists and if so, test
// it's still valid and if so go to select boards.
// If not, display a screen saying "log on to Trello"
// On return from said Trello, test the token.
// Testing the token could be attempting to read boards,
// if it fails, reset the token and display log on prompt again

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
      beforeEnter: requireAuth()
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/ListCards",
      name: "listcards",
      component: ListCards
    },
    {
      path: "/return",
      component: Home,
      props: (route) => ({ token: route.hash })
    },
    {
      path: "*",
      component: Home,
      beforeEnter: doDefault()
    }
  ]
});
