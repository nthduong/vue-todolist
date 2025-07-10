import { ref } from 'vue'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useTodoStore = defineStore('todos', () => {
  const todos = ref([])
  const currentId = ref(null)
  const isShowModal = ref(false)

  const currentText = computed(() => {
    return todos.value.find((todo) => todo.id === currentId.value)
  })

  function removeItem(id) {
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }

  function changeText(newText) {
    todos.value.forEach((todo) => {
      if (todo.id === currentId.value) {
        todo.text = newText
      }
    })
  }
  return { todos, removeItem, isShowModal, changeText, currentId, currentText }
})
