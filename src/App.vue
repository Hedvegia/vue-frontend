<template>
  <div id="app">
    <h1>TODOS:</h1>
    <items-list></items-list>
    <button v-show="!isEdit" v-on:click="trueInput()">Add</button>
    <div v-show="isEdit">
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
      <button v-on:click="falseInput()">SAVE</button>
    </div>
  </div>
</template>

<script>
import { CREATE_TODO } from './gql'
import ItemsList from './components/Items'
import swal from 'sweetalert';

export default {
  data: () => {
    return {
      isEdit: false,
      title: "",
      notes: "",
      selected: ""
    }
  },
  methods: {
    handleInput(value) {
      this.title = value
    },
    handleNotes(value) {
      this.notes = value
    },
    trueInput() {
      this.isEdit = true
    },
    falseInput() {
      this.$apollo.mutate({
        mutation: CREATE_TODO,
        variables: { input: { title: this.title, notes: this.notes, state: this.selected } }
      })
      .then(response => {
        this.$apollo.provider.defaultClient.resetStore()
        swal({title: 'Successfully added', icon: "success"})
      })
      .catch(err => swal({ title: "Something happened.:(", icon: "error" }))
      this.isEdit = false
    }
  },
  name: 'app',
  components: {
    ItemsList
  },
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
}

h1, h2 {
  font-weight: normal;
}

p {
   cursor: pointer
 }

</style>
