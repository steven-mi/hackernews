<template>
  <div id="container">
    <h1>News Feed</h1>
    <List
      :list-items="sortedNews"
      :is-authenticated="isAuthenticated"
      @delete-item="deleteItem($event)"
      @update-item="updateItem"
      @sort-item="descending = !descending"
    ></List>
    <BasicInput
      v-if="isAuthenticated"
      @create-item="createItem($event)"
    ></BasicInput>
  </div>
</template>

<script>
import posts from '@/apollo/queries/posts.graphql'
import write from '@/apollo/mutations/write.graphql'
import upvote from '@/apollo/mutations/upvote.graphql'
import BasicInput from '~/components/BasicInput/BasicInput'
import List from '~/components/List/List'

export default {
  components: {
    List,
    BasicInput,
  },
  data() {
    return {
      counter: 3,
      descending: true,
      news: [],
    }
  },
  computed: {
    isAuthenticated() {
      return !!this.$store.state.auth.token
    },
    sortedNews() {
      if (this.descending) {
        return [...this.news].sort((a, b) =>
          a.votes < b.votes ? 1 : b.votes < a.votes ? -1 : 0
        )
      } else {
        return [...this.news].sort((a, b) =>
          a.votes > b.votes ? 1 : b.votes > a.votes ? -1 : 0
        )
      }
    },
  },
  async beforeCreate() {
    try {
      const response = await this.$apollo.query({
        query: posts,
      })
      this.news = response.data.posts
    } catch {
      this.news = []
    }
  },
  async updated() {
    try {
      const response = await this.$apollo.query({
        query: posts,
      })
      this.news = response.data.posts
    } catch {
      this.news = []
    }
  },
  methods: {
    async createItem(title) {
      try {
        await this.$apollo.mutate({
          mutation: write,
          // Parameters
          variables: {
            title,
          },
          context: {
            headers: {
              Authorization: this.$store.state.auth.token,
            },
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
    deleteItem(item) {
      this.news = this.news.filter((el) => el.id !== item.id)
    },
    async updateItem(item) {
      const id = item.id
      try {
        await this.$apollo.mutate({
          mutation: upvote,
          // Parameters
          variables: {
            id,
          },
          context: {
            headers: {
              Authorization: this.$store.state.auth.token,
            },
          },
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
