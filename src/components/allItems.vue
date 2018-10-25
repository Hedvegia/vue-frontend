<template>
  <div class="template">
    <div class="flex-container" v-show="itemId !== item.id" v-on:dblclick="completeTodo(item)">
      <p>Title: </p>
      <p> {{ item.title }} </p>
      <p>Notes: </p>
      <p> {{ item.notes }} </p>
      <button class="left" :id="item.state" v-on:click="getAlert(item.id)">CHANGE</button>
      <button class="right" :id="item.state" v-on:click="deleteItem(item.id)">DELETE</button>
    </div>
    <div class="flex" v-show="itemId === item.id">
      <p>Title: </p>
      <input @input="handleInput($event.target.value)" v-bind:value="item.title">
      <p>Notes: </p>
      <input @input="handleNotes($event.target.value)" v-bind:value="item.notes">
      <p>Completed </p>
      <select v-on:change="onChange($event.target.value)" v-bind:value="item.state">
        <option value="pending">pending</option>
        <option value="completed">completed</option>
        <option value="todo">todo</option>
      </select>
      <button class="left" v-on:click="back()">BACK</button>
      <button class="right" v-on:click="saveData(itemId)">SAVE</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Items',
    props: ['item', 'getAlert', 'itemId', 'deleteItem', 'saveData', 'back', 'handleNotes', 'handleInput', 'onChange', 'completeTodo',],
  }
</script>