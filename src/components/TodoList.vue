<script setup>
import TodoItem from './TodoItem.vue'
import { useTodoStore } from '@/stores/useTodoStore'

const store = useTodoStore()

const removeTodo = (id) => {
  store.removeTodo(id)
}
</script>

<template>
  <todo-item v-for="todo in store.todos" :key="todo.id" :todo="todo" @deleteTodo="removeTodo" />
</template>
