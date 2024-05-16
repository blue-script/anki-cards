import { flashcardsApi } from '@/services/flashcardsApi'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(flashcardsApi.middleware),
  //concat(newApi.middleware)
  reducer: {
    [flashcardsApi.reducerPath]: flashcardsApi.reducer,
    //[newApi.reducerPath]: newApi.reducer,
  },
})

// Метод setupListeners, подключает слушатели событий фокуса (refetchOnFocus) и повторного подключения (refetchOnReconnect ), чтобы автоматически перезагружать данные при возвращении на страницу или восстановлении подключения
setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
