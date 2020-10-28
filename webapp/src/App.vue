<template>
  <div id="app">
    <h1>News List</h1>
    <List
        :listItems='news'
        v-on:delete-item='deleteItem($event)'
        v-on:update-item='updateItem'
    ></List>
    <BasicInput v-on:create-item='createItem($event)'></BasicInput>
  </div>
</template>


<script>
import List from './components/List'
import BasicInput from './components/BasicInput'

export default {
  name: 'App',
  components: {
    List,
    BasicInput
  },
  data: function () {
    return {
      counter: 3,
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
      this.sortItems();
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
      this.sortItems();
    },
    sortItems: function () {
      this.news = [...this.news].sort((a, b) => (a.votes < b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0));
    }
  },
  mounted: function () {
    this.sortItems()
  },

}
</script>

<style>

</style>
