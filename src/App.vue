<template>
  <div id="app">
    <h1>{{ hello }}</h1>
    <items-list></items-list>
    <p v-show="!isEdit" v-on:click="showInput()">{{message}}</p>
    <div v-show="isEdit">
      <input @input="handleInput($event.target.value)">
      <button v-on:click="showInput()">SAVE</button>
    </div>
  </div>
</template>

<script>
import { hello } from './gql'
import ItemsList from './components/Items'

export default {
  apollo: {
    hello
  },
  data: () => {
    return {
      message: "valami",
      isEdit: false
    }
  },
  methods: {
    handleInput(value) {
      this.message = value
    },
    showInput() {
      this.isEdit = !this.isEdit
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
}

h1, h2 {
  font-weight: normal;
}

p {
   cursor: pointer
 }

</style>
