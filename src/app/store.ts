import { flashcardsApi } from '@/services/flashcardsApi'
import { appReducer, appSliceName } from '@/shared/store/appSlice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(flashcardsApi.middleware),
  reducer: {
    [appSliceName]: appReducer,
    [flashcardsApi.reducerPath]: flashcardsApi.reducer,
  },
})

// Метод setupListeners, подключает слушатели событий фокуса (refetchOnFocus) и повторного подключения (refetchOnReconnect ), чтобы автоматически перезагружать данные при возвращении на страницу или восстановлении подключения
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
