<template>
  <h1>Sign Up Page</h1>

  <form>
    <label for="username">Username</label>
    <input id="username" placeholder="username" v-model="username" />

    <label for="email">E-mail</label>
    <input
      id="email"
      placeholder="email"
      data-testid="emailInput"
      v-model="email"
    />

    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      v-model="password"
      placeholder="Password"
      data-testid="passwordInput"
    />
    <label for="password-repeat">Password Repeat</label>
    <input
      id="password-repeat"
      type="password"
      v-model="passwordRepeat"
      placeholder="Password Repeat"
      data-testid="passwordRepeatInput"
    />

    <button
      data-testid="submit"
      :disabled="isButtonDisabled"
      @click.prevent="handleSignUp"
    >
      Sign Up
    </button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUpPage",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
    };
  },

  computed: {
    isButtonDisabled() {
      return !(
        this.password === this.passwordRepeat &&
        this.password &&
        this.passwordRepeat
      );
    },
  },

  methods: {
    handleSignUp() {
      axios.post("/api/1.0/users", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
