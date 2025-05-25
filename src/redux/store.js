import { configureStore } from "@reduxjs/toolkit";
import { currencyReducer } from "./currency/slice";
import { ratesReducer } from "./rates/slice";
import { filterReducer } from "./filter/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['baseCurrency']
};

const persistedReducer = persistReducer(persistConfig, currencyReducer);

export const store = configureStore({
    reducer: {
        currency: persistedReducer,
        rates: ratesReducer,
        filter: filterReducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);