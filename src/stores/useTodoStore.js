import { v4 as uuidv4 } from 'uuid'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import * as todoService from '@/services/todoService'

export const useTodoStore = defineStore('todos', () => {
  const todos = ref([])
  const loading = ref(false)
  const error = ref(null)

  const completedTodoCount = computed(() => todos.value.filter((todo) => !todo.completed).length)

  const fetchTodos = async () => {
    loading.value = true
    try {
      const response = await todoService.getTodos()
      todos.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addTodo = async (text) => {
    try {
      const newTodo = { id: uuidv4(), text, completed: false, createdAt: new Date().toISOString() }
      const response = await todoService.createTodo(newTodo)
      todos.value.unshift(response.data)
    } catch(err) {
      console.log(err);
    }
  }
  const removeTodo = async (id) => {
    await todoService.deleteTodo(id)
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }
  const removeAll = async () => {
    const ids = todos.value.map(todo => todo.id)
    Promise.all(ids.map(id => await ))
    todos.value = []
  }
  function updateTextTodo(newText, id) {
    todos.value.forEach((todo) => {
      if (todo.id === id) {
        todo.text = newText
      }
    })
  }
  function updateCheckTodo(id, completed) {
    const todo = todos.value.find((todo) => todo.id === id)
    if (todo) {
      todo.completed = completed
    }
  }
  function moveToBottom(id) {
    const index = todos.value.findIndex((todo) => todo.id === id)
    if (index === -1) return
    const [item] = todos.value.splice(index, 1)
    todos.value.push(item)
  }
  function sortTodos() {
    todos.value.sort((a, b) => a.id - b.id)
  }
  return {
    todos,
    loading,
    error,
    completedTodoCount,
    fetchTodos,
    addTodo,
    updateTextTodo,
    updateCheckTodo,
    moveToBottom,
    sortTodos,
    removeTodo,
    removeAll,
  }
})
