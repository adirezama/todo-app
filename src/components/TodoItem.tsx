import { Trash2, Check } from 'lucide-react'
import { Todo } from '../store/todosSlice'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="group flex items-center gap-3 p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:border-cyan-500/50 transition-all duration-300 animate-fadeIn">
      <button
        onClick={() => onToggle(todo.id)}
        className={`shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
          todo.completed
            ? 'bg-cyan-500 border-cyan-500'
            : 'border-gray-500 hover:border-cyan-400'
        }`}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && <Check className="w-4 h-4 text-white" />}
      </button>

      <span
        className={`flex-1 transition-all duration-300 ${
          todo.completed
            ? 'text-gray-500 line-through'
            : 'text-gray-200'
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="shrink-0 p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100"
        aria-label="Delete todo"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  )
}
