<template>
  <div class="container">
    <div>
      <LoginForm @login="login($event)" />
    </div>
  </div>
</template>

<script>
import LoginForm from '~/components/LoginForm/LoginForm'
import login from '~/apollo/mutations/login.graphql'

export default {
  components: { LoginForm },
  methods: {
    async login({ email, password }) {
      try {
        const response = await this.$apollo.mutate({
          mutation: login,
          // Parameters
          variables: {
            email,
            password,
          },
        })
        this.$store.commit('auth/set', {
          token: response.data.login,
          email,
        })
        await this.$router.push('/')
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
