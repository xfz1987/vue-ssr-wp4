<template>
	<section class="real-app">
		<div class="tab-container">
      <Tabs :value="filter" @change="handleChangeTab">
        <Tab v-for="tab in stats" :key="tab" :label="tab" :index="tab"/>
        <!-- <Tab label="tab1" index="1" />
        <Tab label="tab2" index="2"><span slot="label" style="color:red">tab2</span></Tab>
        <Tab label="tab3" index="3" /> -->
      </Tabs>
    </div>
    <input type="text" class="add-input" placeholder="what to do?" @keyup.enter="handleAdd"  autofocus>
		<Item v-for="todo in filterdTodos" :key="todo.id" :todo="todo" @delete="deleteTodo" @toggle="toggleTodoState"></Item>
		<Helper :filter="filter" :todos="todos" @clearAllCompleted="clearAllCompleted" />
	</section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Item from './item.vue'
import Helper from './helper.vue'

export default {
  asyncData ({ store, router }) {
    if (store.state.user) {
      return store.dispatch('fetchTodos')
    }
    router.replace('/login')
    return Promise.resolve()
  },
  data () {
    return {
      filter: 'all',
      stats: ['all', 'active', 'completed']
    }
  },
  computed: {
    ...mapState(['todos']),
    filterdTodos () {
      if (this.filter === 'all') return this.todos
      return this.todos.filter(_ => _.completed === (this.filter === 'completed'))
    }
  },
  components: { Item, Helper },
  mounted () {
    if (this.todos && this.todos.length < 1) {
      this.fetchTodos()
    }
  },
  methods: {
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'deleteTodo',
      'updateTodo',
      'deleteAllCompleted'
    ]),
    handleAdd (e) {
      const content = e.target.value.trim()
      if (!content) {
        this.$notify({ content: '必须输入要做的内容' })
        return
      }
      this.addTodo({ content, completed: false })
      e.target.value = ''
    },
    clearAllCompleted () {
      this.deleteAllCompleted()
    },
    handleChangeTab (value) {
      this.filter = value
    },
    toggleTodoState (todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, { completed: !todo.completed })
      })
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
.tab-container{
  background-color: #fff;
  padding: 0 15px;
}
</style>