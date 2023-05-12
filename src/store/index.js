import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
      id: null,
    };
  },

  mutations: {
    LOGIN_STATUS(state, userData) {
      state.isLoggedIn = true;
      state.id = userData.id;
    },
  },

  actions: {
    loginStatus({ commit }, userData) {
      commit("LOGIN_STATUS", userData);
    },
  },
});

export default store;
