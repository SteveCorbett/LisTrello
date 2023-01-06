import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import moment from "moment";

const app = createApp(App).use(store).use(router).use(vuetify);

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
