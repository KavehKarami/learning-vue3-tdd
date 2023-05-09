<template>
  <div
    class="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
    data-testid="signup-page"
  >
    <base-card v-if="!isAccountActivation" data-testid="signup-form">
      <template v-slot:header>
        <h1>{{ $t("sign_up") }}</h1>
      </template>
      <template v-slot:body>
        <base-input
          id="username"
          :title="$t('username')"
          :placeholder="$t('username')"
          data-testid="usernameInput"
          help-test-id="invalid-username"
          :help="errors.username"
          v-model="username"
        />

        <base-input
          id="email"
          :title="$t('email')"
          :placeholder="$t('email')"
          data-testid="emailInput"
          help-test-id="invalid-email"
          :help="errors.email"
          v-model="email"
        />

        <base-input
          id="password"
          :title="$t('password')"
          type="password"
          :placeholder="$t('password')"
          data-testid="passwordInput"
          help-test-id="invalid-password"
          :help="errors.password"
          v-model="password"
        />

        <base-input
          id="password-repeat"
          :title="$t('password_repeat')"
          type="password"
          :placeholder="$t('password_repeat')"
          data-testid="passwordRepeatInput"
          help-test-id="invalid-repeat-password"
          :help="
            this.password !== this.passwordRepeat ? $t('password_mismatch') : ''
          "
          v-model="passwordRepeat"
        />

        <div class="text-center">
          <button-with-progress
            :disabled="isButtonDisabled"
            :is-loading="isLoading"
            :on-click="handleSignUp"
          >
            {{ $t("sign_up") }}
          </button-with-progress>
        </div>
      </template>
    </base-card>
    <div
      v-else
      class="mt-5 alert alert-success"
      data-testid="account-activation"
    >
      {{ $t("successful_sign_up") }}
    </div>
  </div>
</template>

<script>
import services from "../api/api";
import ButtonWithProgress from "../components/ButtonWithProgress.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseCard from "../components/BaseCard.vue";
export default {
  name: "SignUpPage",
  components: { BaseInput, ButtonWithProgress, BaseCard },
  data() {
    return {
      isLoading: false,
      isAccountActivation: false,
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      errors: {},
    };
  },

  computed: {
    isButtonDisabled() {
      return (
        !(
          this.password === this.passwordRepeat &&
          this.password &&
          this.passwordRepeat
        ) || this.isLoading
      );
    },
  },

  watch: {
    username() {
      if (this.errors.username) delete this.errors.username;
    },
    email() {
      if (this.errors.email) delete this.errors.email;
    },
    password() {
      if (this.errors.password) delete this.errors.password;
    },
  },

  methods: {
    handleSignUp() {
      this.isLoading = true;

      services
        .signup({
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.isAccountActivation = true;
        })
        .catch((e) => {
          if (e.response.status === 400)
            this.errors = e.response.data.validationErrors;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
