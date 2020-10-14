<template>
  <div id="list">
      <ListItem v-for="item in listItems" :key="item.id" :item="item">
    </ListItem>
  </div>
</template>


<script>
import  ListItem from './ListItem'  

export default {
  name: 'List',
  components: {
      ListItem
  },
  props: [
      'listItems'
  ]

  
}
</script>

<style>

</style>
