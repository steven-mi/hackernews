<template>
  <div>
    <nav>
      <div class="logo">
        <NuxtLink to="/">
          <Logo />
          news
        </NuxtLink>
      </div>
      <div v-if="!this.$store.state.auth.token" class="option">
        <NuxtLink to="/login">Login</NuxtLink>
      </div>
      <div v-if="!this.$store.state.auth.token" class="option">
        <NuxtLink to="/signup">Signup</NuxtLink>
      </div>
      <div v-if="this.$store.state.auth.token" class="option">
        <a @click="() => this.$store.commit('auth/reset')">Logout</a>
      </div>
    </nav>
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<style>
.logo {
  float: left;
  padding-left: 2rem;
}
.option {
  float: right;
  padding-right: 2rem;
}
nav {
  font-size: 1.8rem;
  padding-top: 2rem;
}

/* home route and active route will show in bold as it matches / and /about */
a.nuxt-link-active {
  font-weight: bold;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: #00c58e;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  margin: 0;
}

img {
  margin-bottom: 1rem;
}

a,
a:visited {
  text-decoration: none;
  color: inherit;
}

a:hover {
  color: #00c58e;
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

main {
  margin: 0 auto;
  padding: 0 1rem;
  margin-top: 100px;
  max-width: 1280px;
  text-align: center;
}
</style>
