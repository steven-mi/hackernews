<template>
  <div id="app">
    <h1>News List</h1>
    <List
        :listItems='sortedNews'
        v-on:delete-item='deleteItem($event)'
        v-on:update-item='updateItem'
        v-on:sort-item="decending = !decending"
    ></List>
    <BasicInput v-on:create-item='createItem($event)'></BasicInput>
  </div>
</template>


<script>
import List from '../List/List'
import BasicInput from '../BasicInput/BasicInput'

export default {
  name: 'App',
  components: {
    List,
    BasicInput
  },
  data: function () {
    return {
      counter: 3,
      decending: true,
      news: [
        {
          id: 0,
          title: 'post 1',
          votes: 0
        },
        {
          id: 1,
          title: 'post 2',
          votes: 0
        },
        {
          id: 2,
          title: 'post 3',
          votes: 1
        }
      ],
    }
  },
  methods: {
    createItem: function (newTitle) {
      this.news.push({
        id: this.counter++,
        title: newTitle,
        votes: 0
      });
    },
    deleteItem: function (item) {
      this.news = this.news.filter(el => el.id !== item.id);
    },
    updateItem: function (item) {
      this.news = this.news.map(el => {
        if (el.id === item.id) {
          return item
        }
        return el
      })
    },
  },
  computed: {
    sortedNews: function () {
      if (this.decending) {
        return [...this.news].sort((a, b) => (a.votes < b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0));
      } else {
        return [...this.news].sort((a, b) => (a.votes > b.votes) ? 1 : ((b.votes > a.votes) ? -1 : 0));
      }
    }
  },
}
</script>

<style>

</style>
