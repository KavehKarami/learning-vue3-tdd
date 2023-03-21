<template>
  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
    <div
      v-if="!isAccountActivation"
      class="mt-5 card"
      data-testid="signup-form"
    >
      <h1 class="card-header text-center">{{ $t("sign_up") }}</h1>
      <form class="card-body">
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
          <button
            class="btn btn-outline-primary mt-3"
            data-testid="submit"
            :disabled="isButtonDisabled"
            @click.prevent="handleSignUp"
          >
            <div
              v-if="isLoading"
              class="spinner-border text-primary spinner-border-sm"
              role="status"
              data-testid="spinner"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            {{ $t("sign_up") }}
          </button>
        </div>
      </form>
    </div>
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
import axios from "axios";
import BaseInput from "../components/BaseInput.vue";
export default {
  name: "SignUpPage",
  components: { BaseInput },
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

      axios
        .post(
          "/api/1.0/users",
          {
            username: this.username,
            email: this.email,
            password: this.password,
          },
          {
            headers: {
              "Accept-Language": this.$i18n.locale,
            },
          }
        )
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
