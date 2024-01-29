import { addTx, addCateogry, setRange, loadRange } from "./txSlice";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  actionCreator: addTx,
  effect: (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const category = action.payload.category;
    if (!state.tx.categories.find((el) => el === category)) {
      listenerApi.dispatch(addCateogry(category));
    }
  },
});

listenerMiddleware.startListening({
  actionCreator: setRange,
  effect: (_, listenerApi) => {
    listenerApi.dispatch(loadRange());
  },
});
