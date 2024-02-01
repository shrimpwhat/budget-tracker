import { configureStore } from "@reduxjs/toolkit";
import txReducer from "./txSlice";
import dateRangeSlice, { loadRange } from "./dateRangeSlice";
import { listenerMiddleware } from "./middleware";

export const store = configureStore({
  reducer: {
    tx: txReducer,
    dateRange: dateRangeSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

store.dispatch(loadRange());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
