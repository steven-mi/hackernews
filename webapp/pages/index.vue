<template>
  <div id="container">
    <List
      :list-items="sortedNews"
      :is-authenticated="isAuthenticated"
      @delete-item="deleteItem($event)"
      @upvote-item="upvoteItem"
      @downvote-item="downvoteItem"
      @sort-item="descending = !descending"
    ></List>
    <BasicInput
      v-if="isAuthenticated"
      @create-item="createItem($event)"
    ></BasicInput>
  </div>
</template>

<script>
import posts from '~/apollo/queries/posts.graphql'
import write from '~/apollo/mutations/write.graphql'
import upvote from '~/apollo/mutations/upvote.graphql'
import downvote from '~/apollo/mutations/downvote.graphql'
import deleteQL from '~/apollo/mutations/delete.graphql'
import BasicInput from '~/components/BasicInput/BasicInput'
import List from '~/components/List/List'

export default {
  components: {
    List,
    BasicInput,
  },
  async fetch() {
    const response = await this.$apollo.query({
      query: posts,
      fetchPolicy: 'no-cache',
    })
    let data = response.data.posts
    if (this.$store.state.auth.email) {
      data = data.map((p) => {
        return {
          ...p,
          ...{
            isOwner: p.author.email === this.$store.state.auth.email,
          },
        }
      })
    }
    this.news = data
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
  async updated() {
    await this.$fetch()
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
        await this.$fetch()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
    async upvoteItem(item) {
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
        await this.$fetch()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
    async downvoteItem(item) {
      const id = item.id
      try {
        await this.$apollo.mutate({
          mutation: downvote,
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
        await this.$fetch()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
    async deleteItem(item) {
      const id = item.id
      try {
        await this.$apollo.mutate({
          mutation: deleteQL,
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
        await this.$fetch()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
