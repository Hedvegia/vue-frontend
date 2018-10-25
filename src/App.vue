<template>
  <div id="app">
    <div class="container">
      <h1>TODOS:</h1>
      <div v-show="!isEdit" class="main" v-on:click="trueInput()">+</div>
    </div>
    <div class="flex" v-show="isEdit">
      <p>Title: </p>
      <input @input="handleInput($event.target.value)" placeholder="">
      <p>Notes: </p>
      <input @input="handleNotes($event.target.value)" placeholder="">
      <p>Completed: </p>
      <select v-model="selected">
        <option disabled value=""></option>
        <option>pending</option>
        <option>completed</option>
        <option>todo</option>
      </select>
      <button class="left" v-on:click="closeAdd()">BACK</button>
      <button class="right" v-on:click="falseInput()">SAVE</button>
    </div>
    <items-list></items-list>
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
      this.title = ""
      this.select = ""
      this.notes = ""
    },
    closeAdd() {
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
  color: #2c3e50;
}

body {
  display: flex;
  justify-content: center;
}

.flex-container, .flex {
  display: flex;
  flex-wrap: wrap;
  width: 20em;
  border-radius: 5px;
  margin: 1em;
  border: 1px solid rgba(46, 46, 46, 0.2);
}

.container {
  display: flex;
  flex-wrap: wrap;
  width: 20em;
}

.flex-container:hover {
  transform: scale(1.03);
}

#todo {
  background: rgba(68, 173, 214, 0.158)
}

#completed {
  background: rgba(157, 238, 137, 0.178);
}

#pending {
  background: rgba(255, 255, 0, 0.164);
}

h1 {
  font-weight: normal;
  width: 85%;
  text-align: center
}

p {
   cursor: pointer;
   width: 40%;
   padding-left: 1em;
 }

input, select {
  margin: auto;
  width: 9em;
  height: 2em;
  background: white;
}

button {
  width: 50%;
  height: 3em;
  border: none;
  border-top: 1px solid rgba(46, 46, 46, 0.2);
}

button:hover {
  transform: scale(1.03);
  background: white;
}

.left {
  border-right: 1px solid rgba(46, 46, 46, 0.2);
}

.right {
  border-left: 1px solid rgba(46, 46, 46, 0.2);
}

.main {
  margin-top: 0.45em;
  border-radius: 50%;
  font-size: 2.7em;
  height: 1em;
  width: 1em;
  color: rgba(68, 173, 214, 0.726);
}

.main:hover {
  cursor: pointer;
  transform: scale(0.9);
}

</style>
