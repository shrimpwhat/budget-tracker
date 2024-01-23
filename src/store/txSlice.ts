import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import db from "./db";

export type Tx = {
  type: "0" | "1";
  category: string;
  value: number;
  timestamp: number;
  note: string;
};

export type TxState = {
  transactions: Tx[];
  categories: string[];
  range?: [Date, Date];
};

export const loadTxState = createAsyncThunk("tx/loadState", async () => {
  const txs = await db.getAll("txs");
  const categories = await db
    .getAll("categories")
    .then((res) => res.map((el) => el.name));
  return {
    transactions: txs,
    categories,
  };
});

const initialState: TxState = {
  transactions: [],
  categories: [],
};

export const txSlice = createSlice({
  name: "tx",
  initialState,
  reducers: {
    addTx: (state, action: PayloadAction<Tx>) => {
      db.put("txs", action.payload);
      state.transactions.push(action.payload);
    },
    addCateogry: (state, action: PayloadAction<string>) => {
      state.categories.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadTxState.fulfilled, (state, action) => {
      state.transactions = action.payload.transactions;
      state.categories = action.payload.categories;
    });
  },
});

export const { addTx, addCateogry } = txSlice.actions;
export default txSlice.reducer;
