import {
  PayloadAction,
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import db from "./db";
import { AppDispatch, RootState } from "./store";
import { loadRange } from "./dateRangeSlice";

type Statistics = {
  sum: number;
  categories: { label: string; value: number; id: string }[];
  max: { value: number; category: string };
  min: { value: number; category: string };
};

export type TransactionStats = {
  incomes: Statistics;
  expenses: Statistics;
  networth: { timestamp: number; value: number }[];
};

export type TxState = {
  transactions: Record<number, Tx>;
  categories: Record<string, number>;
  stats: TransactionStats;
};

type TxPayloadWithID = {
  id: number;
  tx: Tx;
};

export const emptyCategory = "Нет данных";
const initalStats: TransactionStats = {
  incomes: {
    sum: 0,
    categories: [],
    max: { value: 0, category: emptyCategory },
    min: { value: Infinity, category: emptyCategory },
  },
  expenses: {
    sum: 0,
    categories: [],
    max: { value: 0, category: emptyCategory },
    min: { value: Infinity, category: emptyCategory },
  },
  networth: [],
};

const initialState: TxState = {
  transactions: {},
  categories: {},
  stats: initalStats,
};

const incrementCategory = (state: TxState, category: string) => {
  state.categories[category] = (state.categories[category] ?? 0) + 1;
};

const decrementCategory = (state: TxState, category: string) => {
  state.categories[category] -= 1;
  if (!state.categories[category]) delete state.categories[category];
};

export const txSlice = createSlice({
  name: "tx",
  initialState,
  reducers: {
    addTx: (state, action: PayloadAction<TxPayloadWithID>) => {
      state.transactions[action.payload.id] = action.payload.tx;
      incrementCategory(state, action.payload.tx.category);
      // console.log(123)
    },
    editTx: (state, action: PayloadAction<TxPayloadWithID>) => {
      const { id, tx: newTx } = action.payload;
      const oldTx = state.transactions[id];

      if (oldTx.category !== newTx.category) {
        decrementCategory(state, oldTx.category);
        incrementCategory(state, newTx.category);
      }

      state.transactions[id] = newTx;
    },
    removeTx: (state, action: PayloadAction<number>) => {
      const tx = state.transactions[action.payload];
      decrementCategory(state, tx.category);
      delete state.transactions[action.payload];
    },
    updateStats: (state, action: PayloadAction<TransactionStats>) => {
      state.stats = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Load date range
    builder.addCase(loadRange.fulfilled, (state, action) => {
      state.transactions = action.payload.transactions;
      state.categories = action.payload.categories;
    });
  },
});

export const postTx = createAsyncThunk<void, Tx, { dispatch: AppDispatch }>(
  "tx/postTx",
  async (tx, { dispatch }) => {
    const id = await db.then((db) => db.put("transactions", tx));
    dispatch(addTx({ id, tx }));
  }
);

export const updateTx = createAsyncThunk<
  void,
  TxPayloadWithID,
  { dispatch: AppDispatch }
>("tx/updateTx", async ({ id, tx }, { dispatch }) => {
  await db.then((db) => db.put("transactions", tx, id));
  dispatch(editTx({ id, tx }));
});

export const deleteTx = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch }
>("tx/deleteTx", async (id, { dispatch }) => {
  await db.then((db) => db.delete("transactions", id));
  dispatch(removeTx(id));
});

export const selectCategories = createSelector(
  [(state: RootState) => state.tx.categories],
  (categories) => Object.keys(categories)
);

export const { addTx, editTx, removeTx, updateStats } = txSlice.actions;
export default txSlice.reducer;
