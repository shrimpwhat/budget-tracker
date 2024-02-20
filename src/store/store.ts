import { configureStore, combineReducers } from "@reduxjs/toolkit";
import txReducer from "./txSlice";
import dateRangeSlice, { loadRange } from "./dateRangeSlice";
import themeReducer from "./themeSlice";
import { listenerMiddleware } from "./middleware";

const rootReducer = combineReducers({
  tx: txReducer,
  dateRange: dateRangeSlice,
  theme: themeReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
    preloadedState,
  });
  store.dispatch(loadRange());
  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
