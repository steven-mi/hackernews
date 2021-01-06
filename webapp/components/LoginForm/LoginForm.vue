<template>
  <div id="login-form">
    <form @submit.prevent>
      <label>
        <input v-model="email" placeholder="Please type your E-Mail here" />
        <input
          v-model="password"
          placeholder="Please type your password here"
        />
        <button @click="$emit('login', { email: email, password: password })">
          Login
        </button>
      </label>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  props: [],
  data() {
    return {
      email: '',
      password: '',
    }
  },
}
</script>

<style scoped></style>
