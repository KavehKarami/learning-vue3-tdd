<template>
  <div class="shadow-sm bg-light">
    <nav class="navbar navbar-expand">
      <div class="container">
        <router-link
          class="navbar-brand"
          to="/"
          data-testid="homepage-nav-link"
        >
          <img
            src="../assets/hoaxify.png"
            width="60"
            alt="Hoaxify Logo"
            data-testid="brand-logo"
          />

          Hoaxify
        </router-link>

        <ul class="navbar-nav ms-auto">
          <li v-if="!$store.state.isLoggedIn">
            <router-link
              class="nav-link"
              to="/signup"
              data-testid="signup-nav-link"
            >
              {{ $t("sign_up") }}
            </router-link>
          </li>
          <li v-if="!$store.state.isLoggedIn">
            <router-link
              class="nav-link"
              to="/login"
              data-testid="login-nav-link"
            >
              {{ $t("login") }}
            </router-link>
          </li>
          <li v-if="$store.state.isLoggedIn">
            <router-link
              class="nav-link"
              :to="'/user/' + $store.state.id"
              data-testid="profile-nav-link"
            >
              My Profile
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
