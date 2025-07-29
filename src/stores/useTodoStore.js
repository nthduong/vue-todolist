import { v4 as uuidv4 } from 'uuid'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import * as todoService from '@/services/todoService'

export const useTodoStore = defineStore('todos', () => {
  const todos = ref([])
  const loading = ref(false)
  const error = ref(null)
  const sortMode = ref('sort-incomplete-first')

  const completedTodoCount = computed(() => todos.value.filter((todo) => !todo.completed).length)

  const sortedTodos = computed(() => {
   if (sortMode.value === 'sort-created-oldest') {
     return [...todos.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
   }
   if (sortMode.value === 'sort-created-newest') {
     return [...todos.value].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
   }
   if (sortMode.value === 'sort-incomplete-first') {
     return [...todos.value].sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
   }
   return todos.value
 })
  const orders = computed(() =>
    todos.value.map((todo) => todo.order).filter((order) => typeof order === 'number'),
  )

  const maxOrder = computed(() => (orders.value.length > 0 ? Math.max(...orders.value) : 0))
  const minOrder = computed(() => (orders.value.length > 0 ? Math.min(...orders.value) : 0))

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
        createdAt: Date.now(),
        order: maxOrder.value + 1,
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
       console.error('Lỗi khi di chuyển todo lên đầu:', error)
     }
  }
  const sortByOldest = () => {
    setSortMode('sort-created-oldest')
  }
  const sortByNewest = () => {
    setSortMode('sort-created-newest')
  }
  const sortByIncomplete = () => {
    setSortMode('sort-incomplete-first')
  }

  const setSortMode = (mode) => {
      sortMode.value = mode
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
    sortByOldest,
    sortByNewest,
    sortByIncomplete,
    removeTodo,
    removeAll,
  }
})
