import { configureStore } from '@reduxjs/toolkit'
import { requestsApi } from './requestsApi'
import { uiSlice } from './uiSlice'

export const store = configureStore({
  reducer: {
    [requestsApi.reducerPath]: requestsApi.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(requestsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch