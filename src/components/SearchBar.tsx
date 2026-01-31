import { Search, X } from 'lucide-react'
import { useState, FormEvent } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  onClear: () => void
  loading?: boolean
  placeholder?: string
}

export default function SearchBar({
  onSearch,
  onClear,
  loading = false,
  placeholder = 'Search...',
}: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleClear = () => {
    setQuery('')
    onClear()
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 disabled:opacity-50"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </form>
  )
}
