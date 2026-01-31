import { Link } from '@tanstack/react-router'

import { useState } from 'react'
import { Menu, X, ListTodo, FileText } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)


  return (
    <>
      <header className="p-4 flex items-center justify-between bg-gray-800 text-white shadow-lg">
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors md:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="ml-4 md:ml-0 text-xl font-semibold">
            Todo App
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 mr-4">

          <Link
            to="/todos"
            className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            activeProps={{ className: 'text-cyan-400 font-medium' }}
          >
            <ListTodo size={20} />
            <span>Todos</span>
          </Link>
          <Link
            to="/posts"
            className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            activeProps={{ className: 'text-cyan-400 font-medium' }}
          >
            <FileText size={20} />
            <span>Posts</span>
          </Link>
        </nav>
      </header>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden animate-fadeIn"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/todos"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <ListTodo size={20} />
            <span className="font-medium">Todos</span>
          </Link>

          <Link
            to="/posts"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <FileText size={20} />
            <span className="font-medium">Posts</span>
          </Link>
        </nav>
      </aside>
    </>
  )
}
