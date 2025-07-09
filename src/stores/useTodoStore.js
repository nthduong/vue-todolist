import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todos', () => {
  const todos = ref([])

  return { todos }
})
