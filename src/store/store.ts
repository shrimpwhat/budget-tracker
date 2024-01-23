import { configureStore } from "@reduxjs/toolkit";
import txReducer, { loadTxState } from "./txSlice";
import { listenerMiddleware } from "./middleware";

export const store = configureStore({
  reducer: {
    tx: txReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

store.dispatch(loadTxState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
