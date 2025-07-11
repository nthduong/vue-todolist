import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useModalStore = defineStore('modal', () => {
  const currentIdModal = ref(null)
  const currentTextModal = ref('')
  const isShowModal = ref(false)

  function openModal(todo) {
    isShowModal.value = true
    currentIdModal.value = todo.id
    currentTextModal.value = todo.text
  }

  function closeModal() {
    isShowModal.value = false
    currentIdModal.value = null
    currentTextModal.value = ''
  }

  return { isShowModal, currentIdModal, currentTextModal, openModal, closeModal }
})
