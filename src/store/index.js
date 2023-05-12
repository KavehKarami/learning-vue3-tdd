import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
    };
  },

  mutations: {
    LOGIN_STATUS(state, status) {
      state.isLoggedIn = status;
    },
  },

  actions: {
    loginStatus({ commit }, status) {
      commit("LOGIN_STATUS", status);
    },
  },
});

export default store;
