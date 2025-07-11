import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useModalStore = defineStore('modal', () => {
  const currentId = ref(null)
  const currentText = ref('')
  const isShowModal = ref(false)

  function openModal(todo) {
    isShowModal.value = true
    currentId.value = todo.id
    currentText.value = todo.text
  }

  function closeModal() {
    isShowModal.value = false
    currentId.value = null
    currentText.value = ''
  }

  return { isShowModal, currentId, currentText, openModal, closeModal }
})
