<script setup>
import TodoItem from './TodoItem.vue'
import { useTodoStore } from '@/stores/useTodoStore'

const todoStore = useTodoStore()

const removeTodo = (id) => {
  todoStore.removeTodo(id)
}

const toggleCompleted = ({ id, completed }) => {
  todoStore.updateCheckTodo(id, completed)
}
</script>

<template>
  <transition-group name="fade-move" tag="div">
    <todo-item
      v-for="todo in todoStore.sortedTodos"
      :key="todo.id"
      :todo="todo"
      @removeTodo="removeTodo"
      @toggleCompleted="toggleCompleted"
  /></transition-group>
</template>

<style lang="scss" scoped>
.fade-move-move {
  transition: transform 0.5s ease;
}

.fade-move-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-move-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-move-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-move-leave-active {
  position: absolute;
  width: 100%;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-move-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
</style>
