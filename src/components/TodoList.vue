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
  <todo-item
    v-for="todo in todoStore.todos"
    :key="todo.id"
    :todo="todo"
    @removeTodo="removeTodo"
    @toggleCompleted="toggleCompleted"
  />
</template>
