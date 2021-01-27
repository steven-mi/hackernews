<template>
  <div id="basic-Input">
    <form @submit.prevent>
      <label>
        <input id="input_title" v-model="newTitle" />
        <button id="button_create" @click="$emit('create-item', newTitle)">
          Create
        </button>
      </label>
    </form>
  </div>
</template>

<script>
export default {
  name: 'BasicInput',
  props: [],
  data() {
    return {
      newTitle: '',
    }
  },
}
</script>

<style></style>
