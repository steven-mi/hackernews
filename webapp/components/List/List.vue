<template>
  <div id="list">
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <button
            id="button_sort"
            class="bg-indigo-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-indigo-600 mr-6"
            @click="$emit('sort-item')"
          >
            sort news
          </button>
          <p
            v-if="listItems.length === 0"
            class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          >
            The list is empty :(
          </p>
        </div>

        <div class="mt-10">
          <dl
            class="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10"
          >
            <ListItem
              v-for="item in listItems"
              :id="item.id"
              :key="item.id"
              :item="item"
              :is-authenticated="isAuthenticated"
              @delete-item="$emit('delete-item', $event)"
              @upvote-item="$emit('upvote-item', $event)"
              @downvote-item="$emit('downvote-item', $event)"
            >
            </ListItem>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from '../ListItem/ListItem'

export default {
  name: 'List',
  components: {
    ListItem,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['listItems', 'isAuthenticated'],
}
</script>

<style></style>
