<template>
  <p v-on:click="getAlert(item.id)" v-show="itemId !== item.id">todo: {{ item.title }} </p>
</template>

<script>
  export default {
    name: 'Items',
    props: ['item', 'getAlert', 'itemId'],
  }
</script>