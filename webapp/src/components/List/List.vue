<template>
  <div id="list">
    <ListItem
        v-for="item in listItems"
        :key="item.id"
        :id="item.id"
        :item="item"
        v-on:delete-item="$emit('delete-item', $event)"
        v-on:update-item="$emit('update-item', $event)"
    >
    </ListItem>
    <p v-if="listItems.length === 0">The list is empty :(</p>
    <button @click="$emit('sort-item')" id="button_sort">Sort</button>
  </div>
</template>


<script>
import ListItem from '../ListItem/ListItem'

export default {
  name: 'List',
  components: {
    ListItem
  },
  props: [
    'listItems',
  ]


}
</script>

<style>

</style>
