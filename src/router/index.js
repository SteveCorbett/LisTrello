import Vue from "vue";
import VueRouter from "vue-router";

import ContactUs from "../components/ContactUs"
import Home from "../components/Home";
import Login from "../components/Login";
import Logout from "../components/Logout";
import ListCards from "../components/ListCards";

Vue.use(VueRouter);

const doDefault = () => (from, to, next) => {
  console.log("DoDefault", from);
  console.log(window.location);
  if (from.hash != null && from.hash.startsWith("#token=")) {
    console.log("Set token = " + from.hash.substr(7));
    next("/ListCards");
  } else next();
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
      props: (route) => ({ token: route.hash })
    },
    {
      path: "/contactUs",
      name: "contactUs",
      component: ContactUs
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
