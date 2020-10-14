<template>
  <div id="list-item">
    
    <h2>{{item.title}} - ({{item.votes}})</h2>
    
    <br />
  </div>
</template>


<script>
export default {
  name: 'ListItem',
  props: [
      'item'
  ]
}
</script>

<style>

</style>
