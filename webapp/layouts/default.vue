<template>
  <div>
    <Navbar :is-authenticated="this.$store.state.auth.token" @logout="logout" />
    <Nuxt />
    <Footer />
  </div>
</template>

<style></style>
<script>
import Navbar from '@/components/Navbar/Navbar'
import Footer from '~/components/Footer/Footer'

export default {
  components: { Footer, Navbar },
  methods: {
    logout() {
      this.$store.commit('auth/reset')
    },
  },
}
</script>
