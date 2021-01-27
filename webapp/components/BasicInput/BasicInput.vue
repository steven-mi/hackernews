<template>
  <div id="basic-Input" class="md:flex md:justify-center mb-6">
    <form class="flex" @submit.prevent>
      <label>
        <input
          id="input_title"
          v-model="newTitle"
          class="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
          placeholder="Please type your news here..."
        />
        <button
          id="button_create"
          class="text-white px-8 rounded-r-lg bg-indigo-500 font-bold p-4 uppercase border-indigo-600 border-t border-b border-r"
          @click="
            $emit('create-item', newTitle)
            newTitle = ``
          "
        >
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
