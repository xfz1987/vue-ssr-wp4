<template>
	<section class="real-app">
		<input type="text" class="add-input" placeholder="what to do?" @keyup.enter="addTodo"  autofocus>
		<Item v-for="todo in filterdTodos" :key="todo.id" :todo="todo" @delete="deleteTodo"></Item>
		<Tabs :filter="filter" :todos="todos" @toggle="toggleFilter" @clear="clearAllCompleted" />
	</section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
  data () {
    return {
      todos: [],
      filter: 'ALL'
    }
  },
  computed: {
    filterdTodos () {
      if (this.filter === 'ALL') return this.todos
      return this.todos.filter(_ => _.completed === (this.filter === 'CHECKED'))
    }
  },
  components: { Item, Tabs },
  methods: {
    addTodo (e) {
      if (e.target.value === '') return false
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo () {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(_ => !_.completed)
    }
  }
}
</script>

<style scoped>
.real-app{
    width: 600px;
    margin: 0px auto;
    box-shadow:0px 0px 5px #666;
}
.add-input{
    positon: relative;
    margin: 0px;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4rem;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0px rgba(0,0,0,0);
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
}
</style>