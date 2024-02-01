import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Tx } from "./txSlice";
import { RootState } from "./store";
import db from "./db";

const initialState = {
  start: Number(localStorage.getItem("range-start")),
  end: Number(localStorage.getItem("range-end") ?? Infinity),
};

const dateRangeSlice = createSlice({
  name: "dateRange",
  initialState,
  reducers: {
    setRange: (state, action: PayloadAction<[number, number]>) => {
      state.start = action.payload[0];
      state.end = action.payload[1];
    },
  },
});

type ILoadRangeReturn = {
  transactions: Record<number, Tx>;
  categories: Record<string, number>;
};

export const loadRange = createAsyncThunk<
  ILoadRangeReturn,
  undefined,
  { state: RootState }
>("tx/loadRange", async (_, thunkApi) => {
  const dbTransaction = db.transaction("transactions");
  const txs: Record<number, Tx> = {};
  const { start, end } = thunkApi.getState().dateRange;
  const categories: Record<string, number> = {};
  for await (const cursor of dbTransaction.store) {
    if (cursor.value.timestamp >= start && cursor.value.timestamp <= end)
      txs[cursor.key] = cursor.value;
    categories[cursor.value.category] =
      (categories[cursor.value.category] ?? 0) + 1;
  }

  return {
    transactions: txs,
    categories,
  };
});

export const { setRange } = dateRangeSlice.actions;
export default dateRangeSlice.reducer;
