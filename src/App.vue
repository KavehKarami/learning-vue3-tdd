<template>
  <div class="container">
    <home-page v-if="pathname === '/'" />
    <sign-up-page v-else-if="pathname === '/signup'" />
    <language-selector />
  </div>
</template>

<script>
import SignUpPage from "./pages/SignUpPage.vue";
import LanguageSelector from "./components/LanguageSelector.vue";
import HomePage from "./pages/HomePage.vue";

export default {
  name: "App",
  components: {
    SignUpPage,
    LanguageSelector,
    HomePage,
  },

  computed: {
    pathname() {
      return window.location.pathname;
    },
  },
};
</script>
