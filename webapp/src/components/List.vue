<template>
  <div id="list">
      <ListItem 
      v-for="item in listItems" 
      :key="item.id" 
      :item="item" 
      v-on:delete-item="$emit('delete-item', $event)"
      v-on:update-item="$emit('update-item', $event)"
      >
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
