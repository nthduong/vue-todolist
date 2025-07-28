import { v4 as uuidv4 } from 'uuid'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import * as todoService from '@/services/todoService'

export const useTodoStore = defineStore('todos', () => {
  const todos = ref([])
  const loading = ref(false)
  const error = ref(null)

  const completedTodoCount = computed(() => todos.value.filter((todo) => !todo.completed).length)
  const sortedTodos = computed(() =>
    [...todos.value].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity)),
  )
  const maxOrder = computed(() =>
    Math.max(0, ...todos.value.map((todo) => todo.order).filter((order) => typeof order === 'number')),
  )
  const minOrder = Math.min(
    ...todos.value.map((todo) => (typeof todo.order === 'number' ? todo.order : Infinity)),
  )

  const fetchTodos = async () => {
    loading.value = true
    try {
      const response = await todoService.getTodos()
      todos.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addTodo = async (text) => {
    try {
      const newTodo = {
        id: uuidv4(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        order: maxOrder.value + 1 ,
      }
      const response = await todoService.createTodo(newTodo)
      todos.value.unshift(response.data)
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }
  const removeTodo = async (id) => {
    await todoService.deleteTodo(id)
    todos.value = todos.value.filter((todo) => todo.id !== id)
  }
  const removeAll = async () => {
    try {
      const ids = todos.value.map((todo) => todo.id)
      await Promise.all(ids.map((id) => todoService.deleteTodo(id)))
      todos.value = []
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }
  const updateTextTodo = async (id, newText) => {
    try {
      const todo = todos.value.find((todo) => todo.id === id)

      if (!todo) {
        console.warn('Không tìm thấy todo với id:', id)
        return
      }

      await todoService.updateTodo(id, { ...todo, text: newText })

      todo.text = newText
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }
  const updateCheckTodo = async (id, completed) => {
    try {
      const todo = todos.value.find((todo) => todo.id === id)

      if (!todo) {
        console.warn('Không tìm thấy todo với id:', id)
        return
      }

      await todoService.updateTodo(id, { ...todo, completed: completed })
      if (todo) {
        todo.completed = completed
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    }
  }
  const moveToBottom = async (id) => {
    try {
      const index = todos.value.findIndex((todo) => todo.id === id)
      if (index === -1) {
        console.warn(`Todo với id ${id} không tồn tại.`)
        return
      }
      const [todo] = todos.value.splice(index, 1)
        todos.value.push(todo)
        const newOrder = maxOrder.value + 1
        todo.order = newOrder
      await todoService.updateTodo(id, { ...todo, order: newOrder })
    } catch (error) {
      console.error('Lỗi khi di chuyển todo xuống cuối:', error)
    }
  }
  const moveToTop = async (id) => {
     try {
       const index = todos.value.findIndex((todo) => todo.id === id)
       if (index === -1) {
         console.warn(`Todo với id ${id} không tồn tại.`)
         return
       }

       const [todo] = todos.value.splice(index, 1)
        todos.value.unshift(todo)
        const newOrder = minOrder.value - 1
        todo.order = newOrder
       await todoService.updateTodo(id, { ...todo, order: newOrder })
     } catch (error) {
       console.error('Lỗi khi di chuyển todo xuống cuối:', error)
     }
  }
  function sortTodos() {
    todos.value.sort((a, b) => a.id - b.id)
  }
  return {
    todos,
    loading,
    error,
    completedTodoCount,
    sortedTodos,
    moveToTop,
    fetchTodos,
    addTodo,
    updateTextTodo,
    updateCheckTodo,
    moveToBottom,
    sortTodos,
    removeTodo,
    removeAll,
  }
})
