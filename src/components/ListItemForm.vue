<script setup>
import ItemFormVue from './ItemForm.vue'
import { useTodoStore } from '@/stores/useTodoStore'
const store = useTodoStore()
</script>

<template>
  <item-form-vue v-for="todo in store.todos" :key="todo.id" :todo="todo" />
</template>
