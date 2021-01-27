<template>
  <div id="list-item">
    <h2>{{ item.title }} - ({{ item.votes }})</h2>
    <button v-if="isAuthenticated" @click="upvoteItem()">Upvote</button>
    <button v-if="isAuthenticated" @click="downvoteItem()">Downvote</button>
    <button v-if="item.isOwner" @click="$emit('delete-item', item)">
      Remove
    </button>
    <br />
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  // eslint-disable-next-line vue/require-prop-types
  props: ['item', 'isAuthenticated'],
  methods: {
    upvoteItem() {
      this.$emit('update-item', { ...this.item, votes: this.item.votes + 1 })
    },
    downvoteItem() {
      this.$emit('update-item', { ...this.item, votes: this.item.votes - 1 })
    },
  },
}
</script>

<style></style>
