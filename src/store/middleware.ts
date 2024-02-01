import { AppDispatch, RootState } from "./store";
import { setRange, loadRange } from "./dateRangeSlice";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { removeTx, editTx } from "./txSlice";
export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setRange,
  effect: (_, { dispatch }) => {
    (dispatch as AppDispatch)(loadRange());
  },
});

listenerMiddleware.startListening({
  actionCreator: editTx,
  effect: (action, listenerApi) => {
    const {
      dateRange: { start, end },
    } = listenerApi.getState() as RootState;
    const timestamp = action.payload.newTx.timestamp;
    if (timestamp < start || timestamp > end)
      (listenerApi.dispatch as AppDispatch)(removeTx(action.payload.id));
  },
});
