import axios from "axios";
import i18n from "../locales/i18n.js";

export default {
  signup(body) {
    return axios.post("/api/1.0/users", body, {
      headers: {
        "Accept-Language": i18n.global.locale,
      },
    });
  },

  activate(token) {
    return axios.post("/api/1.0/users/token/" + token);
  },

  getUsers() {
    return axios.get("/api/1.0/users/", { params: { page: 0, size: 3 } });
  },
};
