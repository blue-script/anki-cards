import { flashcardsApi } from '@/services/flashcards-api'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(flashcardsApi.middleware),
  //concat(newApi.middleware)
  reducer: {
    [flashcardsApi.reducerPath]: flashcardsApi.reducer,
    //[newApi.reducerPath]: newApi.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
