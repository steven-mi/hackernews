<template>
  <div id="list-item" class="flex">
    <div class="flex-shrink-0">
      <div
        class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white"
      >
        <!-- Heroicon name: globe-alt -->
        <button
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {{ item.votes }}
        </button>
      </div>
    </div>
    <div class="ml-4">
      <dt class="text-lg leading-6 font-medium text-gray-900">
        {{ item.title }}
      </dt>
      <dd class="mt-2 text-base text-gray-500">
        <button v-if="isAuthenticated" @click="upvoteItem()">Upvote</button>
        <button v-if="isAuthenticated" @click="downvoteItem()">Downvote</button>
        <button v-if="item.isOwner" @click="$emit('delete-item', item)">
          Remove
        </button>
      </dd>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  // eslint-disable-next-line vue/require-prop-types
  props: ['item', 'isAuthenticated'],
  methods: {
    upvoteItem() {
      this.$emit('upvote-item', { ...this.item, votes: this.item.votes + 1 })
    },
    downvoteItem() {
      this.$emit('downvote-item', { ...this.item, votes: this.item.votes - 1 })
    },
  },
}
</script>

<style></style>
