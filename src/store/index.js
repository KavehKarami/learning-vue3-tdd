import { createStore } from "vuex";

const store = createStore({
  state() {
    return (
      JSON.parse(localStorage.getItem("auth")) || {
        isLoggedIn: false,
        id: null,
      }
    );
  },

  mutations: {
    LOGIN_STATUS(state, userData) {
      state.isLoggedIn = true;
      state.id = userData.id;
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
  localStorage.setItem("auth", JSON.stringify(state));
});

export const resetAuthState = () => {
  store.dispatch("reset", JSON.parse(localStorage.getItem("auth")));
};

export default store;
