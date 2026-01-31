export function TodoSkeleton() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 animate-pulse">
      <div className="flex items-center gap-3">
        {/* Checkbox skeleton */}
        <div className="w-5 h-5 bg-slate-700 rounded"></div>
        
        {/* Text skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="h-3 bg-slate-700/60 rounded w-1/2"></div>
        </div>
        
        {/* Button skeleton */}
        <div className="w-8 h-8 bg-slate-700 rounded-lg"></div>
      </div>
    </div>
  )
}

export function PostCardSkeleton() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 animate-pulse">
      {/* Post ID badge skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-6 bg-slate-700 rounded-full"></div>
      </div>
      
      {/* Title skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-5 bg-slate-700 rounded w-full"></div>
        <div className="h-5 bg-slate-700 rounded w-4/5"></div>
      </div>
      
      {/* Body text skeleton */}
      <div className="space-y-2">
        <div className="h-3 bg-slate-700/60 rounded w-full"></div>
        <div className="h-3 bg-slate-700/60 rounded w-full"></div>
        <div className="h-3 bg-slate-700/60 rounded w-3/4"></div>
      </div>
    </div>
  )
}

export function CommentSkeleton() {
  return (
    <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 animate-pulse">
      <div className="flex items-start gap-3 mb-2">
        {/* Avatar skeleton */}
        <div className="shrink-0 w-8 h-8 bg-slate-700 rounded-full"></div>
        
        <div className="flex-1 space-y-2">
          {/* Name skeleton */}
          <div className="h-4 bg-slate-700 rounded w-1/3"></div>
          {/* Email skeleton */}
          <div className="h-3 bg-slate-700/60 rounded w-1/2"></div>
        </div>
      </div>
      
      {/* Comment body skeleton */}
      <div className="pl-11 space-y-2">
        <div className="h-3 bg-slate-700/60 rounded w-full"></div>
        <div className="h-3 bg-slate-700/60 rounded w-4/5"></div>
      </div>
    </div>
  )
}

export function PostDetailSkeleton() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-lg animate-pulse">
      {/* Title skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-6 bg-slate-700 rounded w-3/4"></div>
        <div className="h-6 bg-slate-700 rounded w-1/2"></div>
      </div>
      
      {/* Body skeleton */}
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-slate-700/60 rounded w-full"></div>
        <div className="h-4 bg-slate-700/60 rounded w-full"></div>
        <div className="h-4 bg-slate-700/60 rounded w-5/6"></div>
      </div>
      
      {/* Comments header skeleton */}
      <div className="border-t border-slate-700 pt-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-slate-700 rounded"></div>
          <div className="h-5 bg-slate-700 rounded w-32"></div>
        </div>
        
        {/* Comments skeleton */}
        <div className="space-y-4">
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      </div>
    </div>
  )
}
