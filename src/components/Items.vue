<template>
  <div>
    <h4 v-if="loading">Loading...</h4>
    <items
      v-for="item in getItems"
      :key="item.id"
      v-bind:item="item">
    </items>
  </div>
</template>

<script>
import Items from './allItems'
import { ITEMS } from '../gql'
export default {
  name: 'ItemsList',
  data() {
    return {
      getItems: [],
      loading: 0
    }
  },
  components: {
    Items
  },
  apollo: {
    getItems: {
      query: ITEMS
    }
  }
}
</script>
