import { createI18n } from "vue-i18n";

import en from "./en.json";
import fa from "./fa.json";

const i18n = createI18n({
  locale: "en",
  messages: {
    en,
    fa,
  },
});

export default i18n;
