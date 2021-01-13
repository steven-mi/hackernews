<template>
  <nav>
    <div class="logo">
      <NuxtLink to="/">
        <Logo />
        news
      </NuxtLink>
    </div>
    <div v-if="!isAuthenticated" class="option">
      <NuxtLink to="/login">Login</NuxtLink>
    </div>
    <div v-if="!isAuthenticated" class="option">
      <NuxtLink to="/signup">Signup</NuxtLink>
    </div>
    <div v-if="isAuthenticated" class="option">
      <a id="a_logout" @click="() => $emit('logout')">Logout</a>
    </div>
  </nav>
</template>

<script>
import Logo from '@/components/Logo/Logo'
export default {
  name: 'Navbar',
  components: { Logo },
  // eslint-disable-next-line vue/require-prop-types
  props: ['isAuthenticated'],
}
</script>

<style scoped>
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
</style>
