import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import authSlice from "./features/auth/auth.slice";
import baseApi from "./api/baseApi";
import productSlice from "./features/product/product.slice";
import cartSlice from "./features/cart/cart.slice";

const persistConfig = {
  key: "auth",
  storage: storage,
};

const persistConfigCart = {
  key: "cart",
  storage: storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);
const persistedCartReducer = persistReducer(persistConfigCart, cartSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    product: productSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }).concat(baseApi.middleware);
  },
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
