import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import Print from "vue-print-nb";

Vue.config.productionTip = false;

Vue.use(Print);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
