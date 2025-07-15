<script setup>
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'
import TodoModal from '@/components/TodoModal.vue'
import { useTodoStore } from '@/stores/useTodoStore'
import { useModalStore } from '@/stores/useModalStore'

const todoStore = useTodoStore()
const modalStore = useModalStore()

const closeModal = () => {
  modalStore.closeModal()
}
const updateTextTodo = () => {
  if (modalStore.currentTextModal.trim() === '') return
  todoStore.updateTextTodo(modalStore.currentTextModal, modalStore.currentIdModal)
  modalStore.closeModal()
}
const sortTodos = () => {
  todoStore.sortTodos()
}
const removeAll = () => {
  todoStore.removeAll()
}
</script>
<template>
  <div class="container mx-auto px-4">
    <todo-form />
    <div class="flex">
      <h1 class="todo-desc">
        You have {{ todoStore.completedTodoCount }}
        {{ todoStore.completedTodoCount > 1 ? 'tasks' : 'task' }} to complete
      </h1>
    </div>
    <div class="mt-10 flex flex-col">
      <div class="ml-auto">
        <button @click="removeAll" class="btn">Delete All</button>
        <button @click="sortTodos" class="btn">Oldest Tasks</button>
      </div>
      <todo-list class="relative" />
    </div>

    <todo-modal v-if="modalStore.isShowModal">
      <template #header> Edit Todo </template>

      <template #body>
        <input type="text" class="Modal-input" v-model="modalStore.currentTextModal" />
      </template>

      <template #footer>
        <button @click="updateTextTodo" class="btn">Ok</button>
        <button @click="closeModal" class="btn btn__cancel">Cancel</button>
      </template>
    </todo-modal>
  </div>
</template>

<style lang="scss" scoped>
.Modal-input {
  width: 100%;
  height: 40px;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-weight: 700;
  padding: 0px 5px 0 5px;
}

.btn {
  min-width: 70px;
  padding: 8px 12px;
  border-radius: 4px;
  font-weight: 700;
  background: #748873;
  color: #fff;

  + .btn {
    margin-left: 10px;
  }

  &__cancel {
    background: #e84a5f;
  }
}

.todo-desc {
  font-weight: 700;
  margin-top: 10px;
  color: #748873;
  margin-left: auto;
}
</style>
