<template>
  <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
    <div
      class="mt-5 card"
      data-testid="signup-form"
    >
      <h1 class="card-header text-center">Sign Up Page</h1>
      <form class="card-body">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            class="form-control"
            placeholder="username"
            v-model="username"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">E-mail</label>
          <input
            id="email"
            class="form-control"
            placeholder="email"
            data-testid="emailInput"
            v-model="email"
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Password"
            data-testid="passwordInput"
          />
        </div>

        <div class="mb-3">
          <label for="password-repeat" class="form-label">
            Password Repeat
          </label>
          <input
            id="password-repeat"
            class="form-control"
            type="password"
            v-model="passwordRepeat"
            placeholder="Password Repeat"
            data-testid="passwordRepeatInput"
          />
        </div>

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
    <div v-if="isAccountActivation" class="alert alert-success" data-testid="account-activation">
      Please Check Your E-mail to active your account
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUpPage",
  data() {
    return {
      isLoading: false,
      isAccountActivation: false,
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
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
          console.log(e);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
