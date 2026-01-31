import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './todosSlice'
import postsReducer from './postsSlice'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    posts: postsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
