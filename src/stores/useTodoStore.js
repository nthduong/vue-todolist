import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todos', () => {
  const todos = ref([])
  function addTodo(text) {
    const id = Date.now()
    todos.value.push({ id, text, completed: false })
  }
  function removeTodo(id) {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }
  function updateTextTodo(newText, id) {
    todos.value.forEach((todo) => {
      if (todo.id === id) {
        todo.text = newText
      }
    })
  }
  function updateCheckTodo(id, isCheck) {
    todos.value.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = isCheck
      }
    })
  }
  return { todos, removeTodo, updateTextTodo, addTodo, updateCheckTodo }
})
