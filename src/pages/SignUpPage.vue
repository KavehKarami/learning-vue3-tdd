<template>
  <h1>Sign Up Page</h1>

  <form>
    <label for="username">Username</label>
    <input id="username" placeholder="username" />

    <label for="email">E-mail</label>
    <input id="email" placeholder="email" data-testid="emailInput" />

    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      placeholder="Passowrd"
      data-testid="passwordInput"
    />
    <label for="password-repeat">Password Repeat</label>
    <input
      id="password-repeat"
      type="password"
      placeholder="Passowrd Repeat"
      data-testid="passwordRepeatInput"
    />

    <button data-testid="submit" disabled>Sign Up</button>
  </form>
</template>
