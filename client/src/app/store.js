import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH, PAUSE,
  PERSIST, persistReducer, PURGE,
  REGISTER, REHYDRATE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import adminSlice from './adminSlice';
import appSlice from './appSlice';
import authSlice from './authSlice';
import userSlice from './userSlice';
import userEditSlice from './userEditSlice';
import homeSlice from './homeSlice';
// nested state (like "auth.error")
import { getPersistConfig } from 'redux-deep-persist';


const rootReducer = combineReducers({
  app: appSlice,
  auth: authSlice,
  user: userSlice,
  admin: adminSlice,
  userEdit: userEditSlice,
  home: homeSlice
});

const persistConfig = getPersistConfig({
  key: 'root',
  version: 1,
  storage,
  blacklist: ["auth.error", "user", "admin", 'userEdit'],
  rootReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})
