<template>
  <div id="login-form">
    <form @submit.prevent>
      <label>
        <input v-model="name" placeholder="Please type your name here" />
        <input v-model="email" placeholder="Please type your E-Mail here" />
        <input
          v-model="password"
          placeholder="Please type your password here"
        />
        <button
          @click="
            $emit('signup', { name: name, email: email, password: password })
          "
        >
          Login
        </button>
      </label>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignupForm',
  props: [],
  data() {
    return {
      email: '',
      password: '',
      name: '',
    }
  },
}
</script>

<style scoped></style>
