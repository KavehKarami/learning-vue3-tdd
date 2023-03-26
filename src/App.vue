<template>
  <div class="container">
    <home-page v-if="pathname === '/'" />
    <sign-up-page v-else-if="pathname === '/signup'" />
    <login-page v-else-if="pathname === '/login'" />
    <user-page v-else-if="pathname.startsWith('/user')" />
    <language-selector />
  </div>
</template>

<script>
import SignUpPage from "./pages/SignUpPage.vue";
import HomePage from "./pages/HomePage.vue";
import LoginPage from "./pages/LoginPage.vue";
import UserPage from "./pages/UserPage.vue";
import LanguageSelector from "./components/LanguageSelector.vue";

export default {
  name: "App",
  components: {
    SignUpPage,
    LanguageSelector,
    HomePage,
    LoginPage,
    UserPage,
  },

  computed: {
    pathname() {
      return window.location.pathname;
    },
  },
};
</script>
