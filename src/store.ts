import { create } from 'zustand'
import axios from 'axios'

export type Todo = {
  id: number
  name: string
  done: boolean
}

type TodoState = {
  items: Todo[]
  loading: boolean

  // Actions
  addTodo: (name: string) => void
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
  fetchTodos: () => Promise<void>
}

export const useTodoStore = create<TodoState>((set, get) => ({
  items: [],
  loading: false,

  addTodo: (name) =>
    set((state) => ({
      items: [
        ...state.items,
        { id: Date.now(), name, done: false }
      ]
    })),

  toggleTodo: (id) =>
    set((state) => ({
      items: state.items.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    })),

  deleteTodo: (id) =>
    set((state) => ({
      items: state.items.filter(todo => todo.id !== id)
    })),

  fetchTodos: async () => {
    set({ loading: true })
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    const todos: Todo[] = response.data.map((t: any) => ({
      id: t.id,
      name: t.title,
      done: t.completed
    }))
    set({ items: todos, loading: false })
  },
}))
