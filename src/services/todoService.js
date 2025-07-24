import api from '@/utils/api'

export const getTodos = () => api.get('/todos')
export const createTodo = (todo) => api.post('/todos', todo)
export const deleteTodo = (id) => api.delete(`/todos/${id}`);