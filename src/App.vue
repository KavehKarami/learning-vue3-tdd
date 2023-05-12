<template>
  <nav-bar />

  <div class="container mt-3 mt-md-4">
    <router-view />
    <language-selector />
  </div>
</template>

<script>
import LanguageSelector from "./components/LanguageSelector.vue";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    LanguageSelector,
    NavBar,
  },
};
</script>
