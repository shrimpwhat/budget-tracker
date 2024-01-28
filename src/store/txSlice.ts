import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import db from "./db";
import { RootState } from "./store";

export type Tx = {
  type: "income" | "expense";
  category: string;
  value: number;
  timestamp: number;
  note: string;
};

export type TxState = {
  transactions: Tx[];
  categories: string[];
  range: [number, number];
};

const initialState: TxState = {
  transactions: [],
  categories: [],
  range: JSON.parse(localStorage.getItem("range") || "[0, 0]"),
};

export const loadRange = createAsyncThunk(
  "tx/loadState",
  async (_, thunkApi) => {
    const dbTransaction = db.transaction("txs");
    const txs: Tx[] = [];
    let start, end;
    const range = (thunkApi.getState() as RootState).tx.range;
    if (range[0] && range[1]) [start, end] = range;
    else if (range[0]) {
      start = range[0];
      end = Infinity;
    } else if (range[1]) {
      start = 0;
      end = range[1];
    } else {
      start = 0;
      end = Infinity;
    }
    for await (const cursor of dbTransaction.store)
      if (cursor.value.timestamp >= start && cursor.value.timestamp <= end)
        txs.push(cursor.value);
    const categories = Array.from(new Set(txs.map((tx) => tx.category)));
    return {
      transactions: txs,
      categories,
    };
  }
);

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
    setRange: (state, action: PayloadAction<[number, number]>) => {
      state.range = action.payload;
      localStorage.setItem("range", JSON.stringify(action.payload));
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadRange.fulfilled, (state, action) => {
      state.transactions = action.payload.transactions;
      state.categories = action.payload.categories;
    });
  },
});

export const { addTx, addCateogry, setRange } = txSlice.actions;
export default txSlice.reducer;
