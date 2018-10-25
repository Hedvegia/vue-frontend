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
      :saveData="saveData"
      :deleteItem="deleteItem"
      :handleNotes="handleNotes"
      :handleInput="handleInput"
      :back="back"
      :onChange="onChange"
      :completeTodo="completeTodo">
    </items>
  </div>
</template>

<script>
import Items from './allItems'
import { ITEMS, UPDATE_ITEMS, DELETE_ITEM } from '../gql'
import swal from 'sweetalert';

export default {
  name: 'ItemsList',
  data() {
    return {
      getItems: [],
      loading: 0,
      itemId: "",
      title: "",
      notes: "",
      selected: "",
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
      this.itemId = itemId
    },
    completeTodo(item) {
      if (item.state === "todo") {
        return this.$apollo.mutate({
          mutation: UPDATE_ITEMS,
          variables: { id: item.id, input: { state: "pending" } }
        }).then(() => this.$apollo.provider.defaultClient.resetStore())
      } else if (item.state === "pending") {
        return this.$apollo.mutate({
          mutation: UPDATE_ITEMS,
          variables: { id: item.id, input: { state: "completed" } }
        }).then(() => this.$apollo.provider.defaultClient.resetStore())
      } else {
        this.itemId = item.id
      }
    },
    deleteItem(itemId) {
      this.$apollo.mutate({
        mutation: DELETE_ITEM,
        variables: { id: itemId }
      }).then(response => {
        swal({title: 'succesfull deleted', icon: "success"})
        this.itemId = ""
        this.$apollo.provider.defaultClient.resetStore()
      }).catch(err => swal({title: "there was an error", icon: "error"}))
    },
    onChange(value) {
      this.selected = value
    },
    back() {
      this.itemId = ""
    },
    saveData(itemId) {
      let data
      this.getItems.map(item => {
        if (item.id === itemId) {
          data = item
        }
      })
      this.$apollo.mutate({
        mutation: UPDATE_ITEMS,
        variables: {id: itemId, input: {
          title: this.title !== "" ? this.title : data.title,
          notes: this.notes !== "" ? this.notes : data.notes,
          state: this.selected !== "" ? this.selected : data.state
        }}
      }).then(response => {
        swal({title: 'succesfull update', icon: "success"})
        this.itemId = ""
        this.$apollo.provider.defaultClient.resetStore()
      }).catch(err => swal({title: "there was an error", icon: "error"}))
    },
    handleInput(value) {
      this.title = value
    },
    handleNotes(value) {
      this.notes = value
    }
  }
}
</script>
