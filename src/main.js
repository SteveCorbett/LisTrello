import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import moment from "moment";

loadFonts();

const app = createApp(App).use(store).use(router).use(vuetify);

app.config.globalProperties.$filters = {
  dateDisplay(value, optionLocalDateFormat) {
    if (!value) return "";
    if (!moment().isValid(value)) {
      return value;
    }
    if (optionLocalDateFormat) {
      return moment.utc(value).local().format("LLL");
    }
    return value;
  },
};

app.mount("#app");
