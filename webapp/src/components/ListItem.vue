<template>
  <div id="list-item">
    
    <h2>{{item.title}} - ({{item.votes}})</h2>
    <button @click="upvoteItem();$emit('update-item', item)">Upvote</button>
    <button @click="downvoteItem();$emit('update-item', item)">Downvote</button>
    <button @click="$emit('delete-item', item)">Remove</button>
    <br />
  </div>
</template>


<script>
export default {
  name: 'ListItem',
  props: [
      'item'
  ],
  methods: {
    upvoteItem: function() {
      this.item.votes++;
    },
    downvoteItem: function() {
      this.item.votes--;
    }
  }
}
</script>

<style>

</style>
