<template>
  <div id="login-form">
    <form @submit.prevent>
      <label>
        <input
          id="input_email"
          v-model="email"
          placeholder="Please type your E-Mail here"
        />
        <input
          id="input_password"
          v-model="password"
          placeholder="Please type your password here"
        />
        <button
          id="button_login"
          @click="$emit('login', { email: email, password: password })"
        >
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
