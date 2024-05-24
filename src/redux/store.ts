import { configureStore } from '@reduxjs/toolkit'
import favoriteBooksReducer from './favoriteBooksSlice'
// ...

export const store = configureStore({
  reducer: {
    "favBookList":favoriteBooksReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch