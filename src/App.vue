<template>
  <div class="container">
    <a href="/" data-testid="homepage-nav-link" @click.prevent="onClickLink">
      Hoaxify
    </a>
    <a
      href="/signup"
      data-testid="signup-nav-link"
      @click.prevent="onClickLink"
    >
      {{ $t("sign_up") }}
    </a>
    <a href="/login" data-testid="login-nav-link" @click.prevent="onClickLink">
      {{ $t("login") }}
    </a>
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

  data() {
    return {
      pathname: window.location.pathname,
    };
  },

  methods: {
    onClickLink(event) {
      this.pathname = event.target.attributes.href.value;
      window.history.pushState({}, "", this.pathname);
    },
  },
};
</script>
