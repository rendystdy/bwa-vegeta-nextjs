import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import { auhtApi } from '@/services/auth'
import { productApi } from '@/services/product'
import { transactionApi } from '@/services/transaction'

export const store = configureStore({
  reducer: {
    [auhtApi.reducerPath]: auhtApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([auhtApi.middleware, productApi.middleware, transactionApi.middleware]), 
})

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch