<template>
  <div id="basic-Input">
      
    <input v-model='newTitle'>
    <button  @click="$emit('create-item', newTitle)">create</button>    
  </div>
</template>


<script>
export default {
  name: 'BasicInput',
  props: [
      
  ],
  data () {
    return{
      newTitle: 'hallo '
    }
  }
  
}
</script>

<style>

</style>
