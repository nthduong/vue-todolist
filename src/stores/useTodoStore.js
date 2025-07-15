import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todos', () => {
  const todos = ref([])

  const completedTodoCount = computed(() => todos.value.filter((todo) => !todo.completed).length)

  function addTodo(text) {
    const id = Date.now()
    todos.value.unshift({ id, text, completed: false })
  }
  function removeTodo(id) {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }
  function removeAll() {
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
    removeTodo,
    updateTextTodo,
    addTodo,
    updateCheckTodo,
    completedTodoCount,
    moveToBottom,
    sortTodos,
    removeAll,
  }
})
