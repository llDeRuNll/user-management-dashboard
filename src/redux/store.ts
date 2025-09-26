import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./users/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const usersPersistConfig = {
  key: "users",
  storage,
  whitelist: ["filters"],
};

const persistedUsersReducer = persistReducer(usersPersistConfig, usersReducer);

const rootReducer = combineReducers({
  users: persistedUsersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
