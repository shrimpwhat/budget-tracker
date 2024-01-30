import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import db from "./db";
import { RootState } from "./store";

export type Tx = {
  id: number;
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

export const txSlice = createSlice({
  name: "tx",
  initialState,
  reducers: {
    addTx: (state, action: PayloadAction<Tx>) => {
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

type ILoadRangeReturn = {
  transactions: Tx[];
  categories: string[];
};

export const loadRange = createAsyncThunk<
  ILoadRangeReturn,
  undefined,
  { state: RootState }
>("tx/loadRange", async (_, thunkApi) => {
  const dbTransaction = db.transaction("txs");
  const txs: Tx[] = [];
  let start, end;
  const range = thunkApi.getState().tx.range;
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
      txs.push({ ...cursor.value, id: cursor.key });

  const categories = Array.from(new Set(txs.map((tx) => tx.category)));
  return {
    transactions: txs,
    categories,
  };
});

export const postTx = createAsyncThunk<
  void,
  Omit<Tx, "id">,
  { state: RootState }
>("tx/postTx", async (tx, thunkApi) => {
  const id = await db.put("txs", tx);
  thunkApi.dispatch(txSlice.actions.addTx({ ...tx, id }));
  if (!thunkApi.getState().tx.categories.includes(tx.category))
    thunkApi.dispatch(txSlice.actions.addCateogry(tx.category));
});

export const { setRange } = txSlice.actions;
export default txSlice.reducer;
