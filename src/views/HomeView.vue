<script setup>
import { onMounted } from 'vue'
import TodoForm from '@/components/Todo/TodoForm.vue'
import TodoList from '@/components/Todo/TodoList.vue'
import TodoEditModal from '@/components/Todo/TodoEditModal.vue'
import { useTodoStore } from '@/stores/useTodoStore'

const todoStore = useTodoStore()

onMounted(async () => {
  await todoStore.fetchTodos()
})

const sortTodos = () => {
  todoStore.sortTodos()
}
const removeAll = () => {
  todoStore.removeAll()
}
</script>
<template>
  <div class="container mx-auto px-4 md:px-8 lg:px-16">
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
    <todo-edit-modal />
  </div>
</template>

<style lang="scss" scoped>
.btn {
  min-width: 130px;
  padding: 8px 12px;
  border-radius: 50px;
  font-weight: 700;
  background: #748873;
  color: #fff;
  user-select: none;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);

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
