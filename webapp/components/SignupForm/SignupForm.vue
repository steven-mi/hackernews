<template>
  <div id="signup-form">
    <form @submit.prevent>
      <label>
        <input
          id="input_name"
          v-model="name"
          placeholder="Please type your name here"
        />
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
          id="button_signup"
          @click="
            $emit('signup', { name: name, email: email, password: password })
          "
        >
          Signup
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
