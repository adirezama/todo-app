import { createFileRoute } from '@tanstack/react-router'
import { Plus, ListTodo } from 'lucide-react'
import { useState, FormEvent, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  selectFilteredTodos,
  selectFilter,
  selectTodosStats,
  FilterType,
} from '../store/todosSlice'
import TodoItem from '../components/TodoItem'
import EmptyState from '../components/EmptyState'
import { TodoSkeleton } from '../components/SkeletonLoader'

export const Route = createFileRoute('/todos')({ component: TodosPage })

function TodosPage() {
  const dispatch = useAppDispatch()
  const filteredTodos = useAppSelector(selectFilteredTodos)
  const currentFilter = useAppSelector(selectFilter)
  const stats = useAppSelector(selectTodosStats)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue.trim()))
      setInputValue('')
    }
  }

  const handleToggle = (id: string) => {
    dispatch(toggleTodo(id))
  }

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id))
  }

  const handleFilterChange = (filter: FilterType) => {
    dispatch(setFilter(filter))
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Todos
            </span>
          </h1>
          <p className="text-gray-400">
            Stay organized and track your tasks effortlessly
          </p>
        </div>

        {/* Add Todo Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 animate-fadeIn"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 disabled:shadow-none disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              Add
            </button>
          </div>
        </form>

        {/* Stats & Filter */}
        <div
          className="mb-6 animate-fadeIn"
          style={{ animationDelay: '0.2s' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex gap-4 text-sm">
              <span className="text-gray-400">
                Total: <span className="text-cyan-400 font-semibold">{stats.total}</span>
              </span>
              <span className="text-gray-400">
                Completed: <span className="text-green-400 font-semibold">{stats.completed}</span>
              </span>
              <span className="text-gray-400">
                Pending: <span className="text-yellow-400 font-semibold">{stats.pending}</span>
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            {(['all', 'pending', 'completed'] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 capitalize ${
                  currentFilter === filter
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700/50 hover:text-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Todos List */}
        <div
          className="space-y-3 animate-fadeIn"
          style={{ animationDelay: '0.3s' }}
        >
          {isLoading ? (
            <div className="space-y-4">
              <TodoSkeleton />
              <TodoSkeleton />
              <TodoSkeleton />
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl">
              <EmptyState
                icon={ListTodo}
                title={
                  stats.total === 0
                    ? 'No todos yet'
                    : `No ${currentFilter} todos`
                }
                description={
                  stats.total === 0
                    ? 'Start by adding your first task above!'
                    : `You don't have any ${currentFilter} tasks at the moment.`
                }
              />
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
