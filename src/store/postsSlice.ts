import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

interface PostsState {
  posts: Post[]
  selectedPost: Post | null
  comments: Comment[]
  loading: boolean
  error: string | null
  searchLoading: boolean
  searchError: string | null
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  comments: [],
  loading: false,
  error: null,
  searchLoading: false,
  searchError: null,
}

// ASYNC THUNKS
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }
  const data: Post[] = await response.json()
  return data
})

export const searchPostById = createAsyncThunk(
  'posts/searchPostById',
  async (postId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    )
    if (!response.ok) {
      throw new Error('Post not found')
    }
    const data: Post = await response.json()
    return data
  }
)

export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (postId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch comments')
    }
    const data: Comment[] = await response.json()
    return data
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearSelectedPost: (state) => {
      state.selectedPost = null
      state.comments = []
      state.searchError = null
    },
  },
  extraReducers: (builder) => {
    // FETCH POSTS
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch posts'
      })

    // SEARCH POST BY ID
    builder
      .addCase(searchPostById.pending, (state) => {
        state.searchLoading = true
        state.searchError = null
      })
      .addCase(searchPostById.fulfilled, (state, action) => {
        state.searchLoading = false
        state.selectedPost = action.payload
      })
      .addCase(searchPostById.rejected, (state, action) => {
        state.searchLoading = false
        state.searchError = action.error.message || 'Post not found'
        state.selectedPost = null
      })

    // FETCH COMMENTS
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false
        state.comments = action.payload
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch comments'
      })
  },
})

export const { clearSelectedPost } = postsSlice.actions

// SELECTORS
export const selectPosts = (state: { posts: PostsState }) => state.posts.posts
export const selectSelectedPost = (state: { posts: PostsState }) =>
  state.posts.selectedPost
export const selectComments = (state: { posts: PostsState }) =>
  state.posts.comments
export const selectPostsLoading = (state: { posts: PostsState }) =>
  state.posts.loading
export const selectPostsError = (state: { posts: PostsState }) =>
  state.posts.error
export const selectSearchLoading = (state: { posts: PostsState }) =>
  state.posts.searchLoading
export const selectSearchError = (state: { posts: PostsState }) =>
  state.posts.searchError

export default postsSlice.reducer
