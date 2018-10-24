<template>
  <div v-on:click="getAlert(item.id)" v-show="itemId !== item.id">
    <p>title: </p>
    <p> {{ item.title }} </p>
    <p>notes: </p>
    <p> {{ item.notes }} </p>
    <p>state: </p>
    <p class="state"> {{ item.state }} </p>
  </div>
</template>

<script>
  export default {
    name: 'Items',
    props: ['item', 'getAlert', 'itemId'],
  }
</script>