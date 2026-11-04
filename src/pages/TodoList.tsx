import { useEffect, useState } from 'react'
import { useTodoStore, type Todo } from '../store'

const Header = () => {
  const count = useTodoStore((state) => state.items.length)

  return <h1>{count} todos</h1>
}

const Todo = ({ todo }: { todo: Todo }) => {
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  const deleteTodo = useTodoStore((state) => state.deleteTodo)

  if (!todo) return null

  return (
    <div>
      {todo.name}
      <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
      <button onClick={() => deleteTodo(todo.id)}>X</button>
    </div>
  )
}

const TodoForm = () => {
  const [newTodo, setNewTodo] = useState('')
  const addTodo = useTodoStore((state) => state.addTodo)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo(newTodo)
      setNewTodo('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button type="submit">Ajouter</button>
    </form>
  )
}

export default function TodoList() {
  const todos = useTodoStore((state) => state.items)
  const completed = useTodoStore((state) => state.items.filter(t => t.done).length)
  const loading = useTodoStore((state) => state.loading)
  const fetchTodos = useTodoStore((state) => state.fetchTodos)

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div>
      <Header />
      {loading && <p>Chargement...</p>}
      <p>Complétées: {completed}</p>
      {todos.map(todo => <Todo key={todo.id} todo={todo} />)}
      <TodoForm />
    </div>
  )
}
