<script setup>
import TodoForm from '@/components/TodoForm.vue'
import TodoList from '@/components/TodoList.vue'
import TodoModal from '@/components/TodoModal.vue'
import { useTodoStore } from '@/stores/useTodoStore'
import { ref } from 'vue'
const store = useTodoStore()
const modalText = ref('')

const closeModal = () => {
  store.isShowModal = false
  modalText.value = ''
}
const changeText = () => {
  store.changeText(modalText.value)
  store.isShowModal = false
  modalText.value = ''
}
</script>
<template>
  <div class="container mx-auto px-4">
    <todo-form />
    <div class="mt-10"></div>
    <todo-list />
    <todo-modal v-if="store.isShowModal">
      <template #header> Edit Todo </template>

      <template #body>
        <input type="text" class="Modal-input" v-model="modalText" />
      </template>

      <template #footer>
        <button @click="changeText" class="btn">Ok</button>
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
</style>
