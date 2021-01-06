<template>
  <div id="list-item">
    <h2>{{ item.title }} - ({{ item.votes }})</h2>
    <button @click="upvoteItem()">Upvote</button>
    <button @click="downvoteItem()">Downvote</button>
    <button @click="$emit('delete-item', item)">Remove</button>
    <br />
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: ['item'],
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
