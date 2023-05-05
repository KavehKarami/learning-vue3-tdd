<template>
  <div
    class="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
    data-testid="login-page"
  >
    <div
      v-if="!isAccountActivation"
      class="mt-5 card"
      data-testid="signup-form"
    >
      <h1 class="card-header text-center">{{ $t("login") }}</h1>
      <form class="card-body">
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
          <button
            class="btn btn-outline-primary mt-3"
            data-testid="submit"
            :disabled="isDisabled"
            @click.prevent="login"
          >
            <base-spinner v-if="isLoading" />
            {{ $t("login") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseSpinner from "../components/BaseSpinner.vue";
import BaseInput from "../components/BaseInput.vue";
import services from "../api/api";
export default {
  name: "SignUpPage",
  components: { BaseInput, BaseSpinner },
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
        await services.login({ email: this.email, password: this.password });
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
