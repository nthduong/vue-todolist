<script setup>
import TodoForm from '@/components/Todo/TodoForm.vue'
import TodoList from '@/components/Todo/TodoList.vue'
import TodoEditModal from '@/components/Todo/TodoEditModal.vue'
import { useTodoStore } from '@/stores/useTodoStore'

const todoStore = useTodoStore()

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
    <todo-edit-modal />
  </div>
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

.todo-desc {
  font-weight: 700;
  margin-top: 10px;
  color: #748873;
  margin-left: auto;
}
</style>
