<template>
  <div id="list">
    <ListItem
      v-for="item in listItems"
      :id="item.id"
      :key="item.id"
      :item="item"
      @delete-item="$emit('delete-item', $event)"
      @update-item="$emit('update-item', $event)"
    >
    </ListItem>
    <p v-if="listItems.length === 0">The list is empty :(</p>
    <button id="button_sort" @click="$emit('sort-item')">Sort</button>
  </div>
</template>

<script>
import ListItem from '../ListItem/ListItem'

export default {
  name: 'List',
  components: {
    ListItem,
  },
  props: ['listItems'],
}
</script>

<style></style>
