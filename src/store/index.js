import { createStore } from "vuex";
import * as storage from "./storage";

const store = createStore({
  state() {
    return (
      storage.getItem("auth") || {
        isLoggedIn: false,
        id: null,
      }
    );
  },

  mutations: {
    LOGIN_STATUS(state, userData) {
      state.isLoggedIn = true;
      for (let key in userData) state[key] = userData[key];
    },
    RESET(state, initialState) {
      state.id = null;
      state.isLoggedIn = false;

      for (let key in initialState) state[key] = initialState[key];
    },
  },

  actions: {
    loginStatus({ commit }, userData) {
      commit("LOGIN_STATUS", userData);
    },
    reset({ commit }, initialState) {
      commit("RESET", initialState);
    },
  },
});

store.subscribe((mutation, state) => {
  storage.setItem("auth", state);
});

export const resetAuthState = () => {
  store.dispatch("reset", storage.getItem("auth"));
};

export default store;
