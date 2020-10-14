<template>
  <div id="app">
    <h1>News List</h1>
    <List :listItems='news'></List>
    <BasicInput v-on:create-item='createItem($event)'></BasicInput>
  </div>
</template>


<script>
import  List  from './components/List' 
import  BasicInput  from './components/BasicInput' 

export default {
  name: 'App',
  components:{
    List,
    BasicInput
  },
  data: function () {
    return{ news:[
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
    ]
    }  
  },
  methods: {
    createItem: function(newTitle){
      this.news.push({
          id: this.news.length,
          title: newTitle,
          votes: 0
      })
    }
  },
  
}
</script>

<style>

</style>
