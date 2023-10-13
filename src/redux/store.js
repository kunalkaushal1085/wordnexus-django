import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './auth/authslice'

export const store = configureStore({
  reducer: {
slice:counterSlice
  },
})