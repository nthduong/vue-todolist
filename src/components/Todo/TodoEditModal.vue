<script setup>
import ModalBase from '@/components/Base/ModalBase.vue'
import { useTodoStore } from '@/stores/useTodoStore'
import { useModalStore } from '@/stores/useModalStore'

const modalStore = useModalStore()
const todoStore = useTodoStore()

const closeModal = () => {
  modalStore.closeModal()
}
const updateTextTodo = () => {
  if (modalStore.currentTextModal.trim() === '') return
  todoStore.updateTextTodo(modalStore.currentTextModal, modalStore.currentIdModal)
  modalStore.closeModal()
}
</script>
<template>
  <transition name="fade">
    <modal-base v-if="modalStore.isShowModal" @close="closeModal" width="400px">
      <template #header> Edit Todo </template>

      <template #body>
        <input type="text" class="Modal-input" v-model="modalStore.currentTextModal" />
      </template>

      <template #footer>
        <button @click="updateTextTodo" class="btn">Ok</button>
        <button @click="closeModal" class="btn btn__cancel">Cancel</button>
      </template>
    </modal-base>
  </transition>
</template>

<style lang="scss" scoped>
.btn {
  min-width: 70px;
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: 700;
  background: #748873;
  color: #fff;
  user-select: none;

  + .btn {
    margin-left: 10px;
  }

  &__cancel {
    background: #e84a5f;
  }
}

.Modal-input {
  width: 100%;
  height: 40px;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-weight: 700;
  padding: 0px 5px 0 5px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
