<template>
  <div>
    <h4 v-if="loading">Loading...</h4>
    <items
      v-for="(item, index) in getItems"
      :key="index"
      v-bind:item="item"
      :getAlert="getAlert"
      :isEdit="itemId !== item.id"
      :itemId="itemId"
      v-on:click="getAlert(item.id)">
    </items>
    <div v-show="!isEdit">
      <p>{{ message }}</p>
      <input @input="handleInput($event.target.value)">
      <button v-on:click="deleteData()">SAVE</button>
    </div>
  </div>
</template>

<script>
import Items from './allItems'
import { ITEMS } from '../gql'
import swal from 'sweetalert';

export default {
  name: 'ItemsList',
  data() {
    return {
      getItems: [],
      loading: 0,
      message: "",
      isEdit: true,
      itemId: ""
    }
  },
  components: {
    Items
  },
  apollo: {
    getItems: {
      query: ITEMS
    }
  },
  methods: {
    getAlert(itemId) {
      this.getItems.map(item => {
        if (item.id === itemId) {
          this.isEdit = false
          this.itemId = itemId
        }
      })
    },
    deleteData() {
      this.itemId = ""
      this.isEdit = true
    }
  }
}
</script>
