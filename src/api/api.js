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

  getUsers(page = 0) {
    return axios.get("/api/1.0/users/", { params: { page, size: 3 } });
  },

  getUserById(id) {
    return axios.get("/api/1.0/users/" + id);
  },

  login(creds) {
    return axios.post("/api/1.0/auth", creds, {
      headers: {
        "Accept-Language": i18n.global.locale,
      },
    });
  },
};
