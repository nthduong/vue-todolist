import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useModalStore } from '@/stores/useModalStore'

export const useTodoStore = defineStore('todos', () => {
  const modalStore = useModalStore()
  const todos = ref([])

  function addTodo(text) {
    const id = Date.now()
    todos.value.push({ id, text })
  }
  function removeTodo(id) {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }
  function updateTodo(newText) {
    todos.value.forEach((todo) => {
      if (todo.id === modalStore.currentIdModal) {
        todo.text = newText
      }
    })
  }
  return { todos, removeTodo, updateTodo, addTodo }
})
