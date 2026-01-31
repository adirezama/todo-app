import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export type FilterType = 'all' | 'completed' | 'pending'

interface TodosState {
  items: Todo[]
  filter: FilterType
}

const loadTodosFromLocalStorage = (): Todo[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem('todos')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveTodosToLocalStorage = (todos: Todo[]) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('todos', JSON.stringify(todos))
  } catch (error) {
    console.error('Failed to save todos to localStorage:', error)
  }
}

const initialState: TodosState = {
  items: loadTodosFromLocalStorage(),
  filter: 'all',
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now().toString() + Math.random().toString(36).slice(2, 11),
        text: action.payload,
        completed: false,
        createdAt: Date.now(),
      }
      state.items.push(newTodo)
      saveTodosToLocalStorage(state.items)
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((t) => t.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
        saveTodosToLocalStorage(state.items)
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload)
      saveTodosToLocalStorage(state.items)
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload
    },
  },
})

export const { addTodo, toggleTodo, deleteTodo, setFilter} = todosSlice.actions

// SELECTORS
export const selectAllTodos = (state: { todos: TodosState }) => state.todos.items

export const selectFilter = (state: { todos: TodosState }) => state.todos.filter

export const selectFilteredTodos = createSelector(
  [selectAllTodos, selectFilter],
  (items, filter) => {
    switch (filter) {
      case 'completed':
        return items.filter((todo: Todo) => todo.completed)
      case 'pending':
        return items.filter((todo: Todo) => !todo.completed)
      default:
        return items
    }
  }
)

export const selectTodosStats = createSelector(
  [selectAllTodos],
  (todos) => {
    return {
      total: todos.length,
      completed: todos.filter((t: Todo) => t.completed).length,
      pending: todos.filter((t: Todo) => !t.completed).length,
    }
  }
)

export default todosSlice.reducer
