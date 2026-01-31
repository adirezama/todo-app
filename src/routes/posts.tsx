import { createFileRoute } from '@tanstack/react-router'
import { FileText, MessageCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  fetchPosts,
  searchPostById,
  fetchComments,
  clearSelectedPost,
  selectPosts,
  selectSelectedPost,
  selectComments,
  selectPostsLoading,
  selectPostsError,
  selectSearchLoading,
  selectSearchError,
} from '../store/postsSlice'
import PostCard from '../components/PostCard'
import SearchBar from '../components/SearchBar'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import { PostCardSkeleton, CommentSkeleton } from '../components/SkeletonLoader'

export const Route = createFileRoute('/posts')({ component: PostsPage })

function PostsPage() {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectPosts)
  const selectedPost = useAppSelector(selectSelectedPost)
  const comments = useAppSelector(selectComments)
  const loading = useAppSelector(selectPostsLoading)
  const error = useAppSelector(selectPostsError)
  const searchLoading = useAppSelector(selectSearchLoading)
  const searchError = useAppSelector(selectSearchError)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleSearch = (query: string) => {
    const postId = parseInt(query, 10)
    if (!isNaN(postId)) {
      dispatch(searchPostById(postId))
      dispatch(fetchComments(postId))
    }
  }

  const handleClearSearch = () => {
    dispatch(clearSelectedPost())
  }

  const handleRetry = () => {
    dispatch(fetchPosts())
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Posts
            </span>
          </h1>
          <p className="text-gray-400">
            Explore posts and search by ID to view comments
          </p>
        </div>

        {/* Search Bar */}
        <div
          className="max-w-2xl mx-auto mb-8 animate-fadeIn"
          style={{ animationDelay: '0.1s' }}
        >
          <SearchBar
            onSearch={handleSearch}
            onClear={handleClearSearch}
            loading={searchLoading}
            placeholder="Search posts by ID (e.g., 1, 2, 3...)"
          />
        </div>

        {/* Search Results */}
        {selectedPost && (
          <div
            className="max-w-3xl mx-auto mb-8 animate-fadeIn"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500 rounded-xl p-6 shadow-lg shadow-cyan-500/20">
              <h2 className="text-2xl font-bold text-gray-200 mb-2 capitalize">
                {selectedPost.title}
              </h2>
              <p className="text-gray-400 mb-6">{selectedPost.body}</p>

              {/* Comments Section */}
              <div className="border-t border-slate-700 pt-4">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-gray-200">
                    Comments ({comments.length})
                  </h3>
                </div>

                {loading ? (
                  <div className="space-y-4">
                    <CommentSkeleton />
                    <CommentSkeleton />
                    <CommentSkeleton />
                  </div>
                ) : comments.length === 0 ? (
                  <p className="text-gray-500 italic">No comments yet</p>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50"
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <div className="shrink-0 w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {comment.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-300 text-sm">
                              {comment.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {comment.email}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm pl-11">
                          {comment.body}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Search Error */}
        {searchError && !selectedPost && (
          <div
            className="max-w-3xl mx-auto mb-8 animate-fadeIn"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/50 rounded-xl p-6">
              <p className="text-red-300 text-center">{searchError}</p>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div
          className="animate-fadeIn"
          style={{ animationDelay: '0.3s' }}
        >
          <h2 className="text-2xl font-bold text-gray-200 mb-6">All Posts</h2>

          {loading && posts.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <ErrorState message={error} onRetry={handleRetry} />
          ) : posts.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No posts available"
              description="There are no posts to display at the moment."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClick={() => {
                    dispatch(searchPostById(post.id))
                    dispatch(fetchComments(post.id))
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  isSelected={selectedPost?.id === post.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
