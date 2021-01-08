<template>
  <div class="container">
    <div>
      <SignupForm @signup="signup($event)" />
    </div>
  </div>
</template>

<script>
import SignupForm from '~/components/SignupForm/SignupForm'
import signup from '~/apollo/mutations/signup.graphql'

export default {
  components: { SignupForm },
  methods: {
    async signup({ name, email, password }) {
      try {
        const response = await this.$apollo.mutate({
          mutation: signup,
          // Parameters
          variables: {
            email,
            name,
            password,
          },
        })
        this.$store.commit('auth/set', {
          token: response.data.signup,
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
