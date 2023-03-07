<template>
  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
    <div
      v-if="!isAccountActivation"
      class="mt-5 card"
      data-testid="signup-form"
    >
      <h1 class="card-header text-center">Sign Up Page</h1>
      <form class="card-body">
        <base-input
          id="username"
          title="Username"
          placeholder="username"
          data-testid="username"
          help-test-id="invalid-username"
          :help="errors.username"
          v-model="username"
        />

        <base-input
          id="email"
          title="E-mail"
          placeholder="email"
          data-testid="emailInput"
          v-model="email"
        />

        <base-input
          id="password"
          title="Password"
          type="password"
          placeholder="Password"
          data-testid="passwordInput"
          v-model="password"
        />

        <base-input
          id="password-repeat"
          title="Password Repeat"
          type="password"
          placeholder="Password Repeat"
          data-testid="passwordRepeatInput"
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
            Sign Up
          </button>
        </div>
      </form>
    </div>
    <div
      v-else
      class="mt-5 alert alert-success"
      data-testid="account-activation"
    >
      Please Check Your E-mail to active your account
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

  methods: {
    handleSignUp() {
      this.isLoading = true;
      axios
        .post("/api/1.0/users", {
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
