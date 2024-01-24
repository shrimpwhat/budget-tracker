import { configureStore } from "@reduxjs/toolkit";
import txReducer, { loadRange } from "./txSlice";
import { listenerMiddleware } from "./middleware";

export const store = configureStore({
  reducer: {
    tx: txReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

store.dispatch(loadRange());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
