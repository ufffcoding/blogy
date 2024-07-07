import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from "./postSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine reducers
const rootReducer = combineReducers({
  auth: authSlice,
  posts: postSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "posts"], // Only persist these slices
};

// Persist the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

const purgePersistedState = () => {
  persistor.purge();
};

export { store, persistor, purgePersistedState };
