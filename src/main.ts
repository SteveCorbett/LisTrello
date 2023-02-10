import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";
import "@/assets/global.css";
import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

import "vuetify/styles";
import vuetify from "./plugins/vuetify";

const app = createApp(App).use(store).use(router).use(vuetify).use(FloatingVue);

app.config.globalProperties.$filters = {
  dateDisplay(value: string | Date, optionLocalDateFormat: boolean): any {
    if (!value) return "";
    if (!moment(value).isValid()) {
      return value;
    }
    if (optionLocalDateFormat) {
      return moment.utc(value).local().format("LLL");
    }
    return value;
  },
};

app.mount("#app");
