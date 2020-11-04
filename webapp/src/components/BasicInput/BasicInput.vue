<template>
  <div id="basic-Input">
    <form @submit.prevent>
      <input v-model='newTitle'>
      <button @click="$emit('create-item', newTitle)">create</button>
    </form>
  </div>
</template>


<script>
export default {
  name: 'BasicInput',
  props: [],
  data() {
    return {
      newTitle: ''
    }
  }

}
</script>

<style>

</style>
