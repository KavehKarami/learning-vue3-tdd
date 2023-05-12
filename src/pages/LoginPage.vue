<template>
  <div
    class="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
    data-testid="login-page"
  >
    <base-card v-if="!isAccountActivation" data-testid="signup-form">
      <template v-slot:header>
        <h1>{{ $t("login") }}</h1>
      </template>
      <template v-slot:body>
        <base-input
          id="email"
          :title="$t('email')"
          :placeholder="$t('email')"
          data-testid="emailInput"
          v-model="email"
        />

        <base-input
          id="password"
          :title="$t('password')"
          type="password"
          :placeholder="$t('password')"
          data-testid="passwordInput"
          v-model="password"
        />

        <div v-if="failMessage" class="alert alert-danger text-center">
          {{ failMessage }}
        </div>

        <div class="text-center">
          <button-with-progress
            :disabled="isDisabled"
            :is-loading="isLoading"
            :on-click="login"
          >
            {{ $t("login") }}
          </button-with-progress>
        </div>
      </template>
    </base-card>
  </div>
</template>

<script>
import BaseInput from "../components/BaseInput.vue";
import services from "../api/api";
import ButtonWithProgress from "../components/ButtonWithProgress.vue";
import BaseCard from "../components/BaseCard.vue";
export default {
  name: "SignUpPage",
  components: { BaseInput, ButtonWithProgress, BaseCard },
  data() {
    return {
      isLoading: false,
      isAccountActivation: false,
      email: "",
      password: "",
      failMessage: "",
    };
  },

  computed: {
    isDisabled() {
      return !(this.email && this.password);
    },
  },

  watch: {
    email() {
      if (this.failMessage) this.failMessage = "";
    },
    password() {
      if (this.failMessage) this.failMessage = "";
    },
  },

  methods: {
    async login() {
      if (this.isLoading) return;
      this.isLoading = true;
      try {
        const { data: userData } = await services.login({
          email: this.email,
          password: this.password,
        });

        this.$store.dispatch("loginStatus", userData);
        this.$router.push("/");
      } catch (e) {
        // console.log(e);
        this.failMessage = e.response.data.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
