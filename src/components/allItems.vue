<template>
  <p>todo: {{ item.title }} </p>
</template>

<script>
  export default {
    name: 'Items',
    props: ['item']
  }
</script>