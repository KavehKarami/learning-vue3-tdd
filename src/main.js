import { createApp } from "vue";
import i18n from "./locales/i18n";
import router from "./routes/router";
import App from "./App.vue";
import store from "./store";

createApp(App).use(i18n).use(router).use(store).mount("#app");
