import { AppDispatch, RootState } from "./store";
import { setRange, loadRange } from "./dateRangeSlice";
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addTx, removeTx, editTx, updateStats } from "./txSlice";
import calcStats from "./calculateStatistics";

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
    const timestamp = action.payload.tx.timestamp;
    if (timestamp < start || timestamp > end)
      (listenerApi.dispatch as AppDispatch)(removeTx(action.payload.id));
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(addTx, removeTx, editTx),
  effect: async (_, listenerApi) => {
    const {
      tx: { transactions },
    } = listenerApi.getState() as RootState;
    const stats = calcStats(transactions);
    (listenerApi.dispatch as AppDispatch)(updateStats(stats));
  },
});

listenerMiddleware.startListening({
  actionCreator: loadRange.fulfilled,
  effect: (action, listenerApi) => {
    const { transactions } = action.payload;
    const stats = calcStats(transactions);
    (listenerApi.dispatch as AppDispatch)(updateStats(stats));
  },
});
