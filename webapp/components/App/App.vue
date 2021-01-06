<template>
  <div id="app">
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
import List from '../List/List'
import BasicInput from '../BasicInput/BasicInput'

export default {
  name: 'App',
  components: {
    List,
    BasicInput,
  },
  data() {
    return {
      counter: 3,
      descending: true,
      news: [
        {
          id: 0,
          title: 'post 1',
          votes: 0,
        },
        {
          id: 1,
          title: 'post 2',
          votes: 0,
        },
        {
          id: 2,
          title: 'post 3',
          votes: 1,
        },
      ],
    }
  },
  computed: {
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
  methods: {
    createItem(newTitle) {
      this.news.push({
        id: this.counter++,
        title: newTitle,
        votes: 0,
      })
    },
    deleteItem(item) {
      this.news = this.news.filter((el) => el.id !== item.id)
    },
    updateItem(item) {
      this.news = this.news.map((el) => {
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
