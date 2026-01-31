import { AlertCircle } from 'lucide-react'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="mb-4 p-6 bg-red-900/20 rounded-full">
        <AlertCircle className="w-12 h-12 text-red-400" />
      </div>
      <h3 className="text-xl font-semibold text-red-300 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-400 max-w-md mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
