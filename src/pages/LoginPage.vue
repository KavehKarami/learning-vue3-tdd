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
      <h1 class="card-header text-center">Login</h1>
      <form class="card-body">
        <base-input
          id="email"
          title="Email"
          placeholder="Email"
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

        <div class="text-center">
          <button
            class="btn btn-outline-primary mt-3"
            data-testid="submit"
            disabled
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseInput from "../components/BaseInput.vue";
export default {
  name: "SignUpPage",
  components: { BaseInput },
  data() {
    return {
      isLoading: false,
      isAccountActivation: false,
      email: "",
      password: "",
    };
  },
};
</script>
