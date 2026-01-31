import { Post } from '../store/postsSlice'

interface PostCardProps {
  post: Post
  onClick?: () => void
  isSelected?: boolean
}

export default function PostCard({
  post,
  onClick,
  isSelected = false,
}: PostCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-6 bg-slate-800/50 backdrop-blur-sm border rounded-xl transition-all duration-300 animate-fadeIn ${
        onClick ? 'cursor-pointer hover:shadow-lg hover:shadow-cyan-500/10' : ''
      } ${
        isSelected
          ? 'border-cyan-500 shadow-lg shadow-cyan-500/20'
          : 'border-slate-700/50 hover:border-cyan-500/50'
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="shrink-0 w-10 h-10 bg-linear-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          {post.id}
        </div>
        <h3 className="flex-1 text-lg font-semibold text-gray-200 capitalize">
          {post.title}
        </h3>
      </div>
      <p className="text-gray-400 leading-relaxed line-clamp-3">{post.body}</p>
    </div>
  )
}
