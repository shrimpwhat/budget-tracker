import { configureStore } from "@reduxjs/toolkit";
import txReducer from "./txSlice";

export const store = configureStore({
  reducer: {
    tx: txReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
