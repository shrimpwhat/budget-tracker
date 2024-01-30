import { AppDispatch } from "./store";
import { setRange, loadRange } from "./txSlice";
import { createListenerMiddleware } from "@reduxjs/toolkit";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setRange,
  effect: (_, listenerApi) => {
    (listenerApi.dispatch as AppDispatch)(loadRange());
  },
});
