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
      <p>Title: </p>
      <input @input="handleInput($event.target.value)">
      <p>Notes: </p>
      <input @input="handleNotes($event.target.value)">
      <p>Completed </p>
      <select v-model="selected">
        <option disabled value="">Please select one</option>
        <option>pending</option>
        <option>completed</option>
        <option>todo</option>
      </select>
      <button v-on:click="saveData()">SAVE</button>
    </div>
  </div>
</template>

<script>
import Items from './allItems'
import { ITEMS, UPDATE_ITEMS } from '../gql'
import swal from 'sweetalert';

export default {
  name: 'ItemsList',
  data() {
    return {
      getItems: [],
      loading: 0,
      isEdit: true,
      itemId: "",
      title: "",
      notes: "",
      selected: ""
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
    saveData() {
      this.$apollo.mutate({
        mutation: UPDATE_ITEMS,
        variables: {id: this.itemId, input: { title: this.message, notes: this.notes, state: this.selected }}
      }).then(response => {
        this.$apollo.provider.defaultClient.resetStore()
        swal({title: 'succesfull update', icon: "success"})
      }).catch(err => swal({title: "there was an error", icon: "error"}))
      this.message = ""
      this.itemId = ""
      this.isEdit = true
    },
    handleInput(value) {
      this.message = value
    },
    handleNotes(value) {
      this.notes = value
    }
  }
}
</script>
