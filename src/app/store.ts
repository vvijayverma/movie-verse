import { configureStore,combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import counterSlice from '../app/services/slices/counterSlice';
import authReducer from '../app/services/slices/authSlice';
import { apiSlice } from "./services/slices/apiSlice";

const persistConfig: any = {
  key: "root",
  storage,
  whitelist:['auth'],
};

const rootReducer = combineReducers({
  counter: counterSlice,
  auth: authReducer,
  [apiSlice.reducerPath]:apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
