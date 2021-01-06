<template>
  <div id="container">
    <h1>News List</h1>
    <List
      :list-items="sortedNews"
      @delete-item="deleteItem($event)"
      @update-item="updateItem"
      @sort-item="descending = !descending"
    ></List>
    <BasicInput @create-item="createItem($event)"></BasicInput>
  </div>
</template>

<script>
import List from '~/components/List/List'
import BasicInput from '~/components/BasicInput/BasicInput'
import posts from '~/apollo/queries/posts.graphql'

export default {
  components: {
    List,
    BasicInput,
  },
  apollo: {
    posts: {
      prefetch: true,
      query: posts,
    },
  },
  data() {
    return {
      counter: 3,
      descending: true,
    }
  },
  computed: {
    sortedNews() {
      if (this.descending) {
        return [...this.posts].sort((a, b) =>
          a.votes < b.votes ? 1 : b.votes < a.votes ? -1 : 0
        )
      } else {
        return [...this.posts].sort((a, b) =>
          a.votes > b.votes ? 1 : b.votes > a.votes ? -1 : 0
        )
      }
    },
  },
  methods: {
    createItem(newTitle) {
      this.posts.push({
        id: this.counter++,
        title: newTitle,
        votes: 0,
      })
    },
    deleteItem(item) {
      this.posts = this.posts.filter((el) => el.id !== item.id)
    },
    updateItem(item) {
      this.posts = this.posts.map((el) => {
        if (el.id === item.id) {
          return item
        }
        return el
      })
    },
  },
}
</script>

<style></style>
