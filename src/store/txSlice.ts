import {
  PayloadAction,
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import db from "./db";
import { AppDispatch, RootState } from "./store";
import { loadRange } from "./dateRangeSlice";

export type Tx = {
  type: "income" | "expense";
  category: string;
  value: number;
  timestamp: number;
  note: string;
};

export type TxState = {
  transactions: Record<number, Tx>;
  categories: Record<string, number>;
};

const initialState: TxState = {
  transactions: {},
  categories: {},
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
    editTx: (
      state,
      action: PayloadAction<{
        id: number;
        newTx: Tx;
      }>
    ) => {
      const { id, newTx } = action.payload;
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
  },

  extraReducers: (builder) => {
    // Load date range
    builder.addCase(loadRange.fulfilled, (state, action) => {
      state.transactions = action.payload.transactions;
      state.categories = action.payload.categories;
    });

    // Add tx
    builder.addCase(postTx.fulfilled, (state, action) => {
      state.transactions[action.payload.id] = action.payload.tx;
      incrementCategory(state, action.payload.tx.category);
    });
  },
});

export const postTx = createAsyncThunk<
  { id: number; tx: Tx },
  Tx,
  { state: RootState }
>("tx/postTx", async (tx) => {
  const id = await db.put("transactions", tx);
  return { id, tx };
});

export const updateTx = createAsyncThunk<
  void,
  {
    id: number;
    newTx: Tx;
  },
  { dispatch: AppDispatch }
>("tx/updateTx", async ({ id, newTx }, { dispatch }) => {
  await db.put("transactions", newTx, id);
  dispatch(editTx({ id, newTx }));
});

export const deleteTx = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch }
>("tx/deleteTx", async (id, { dispatch }) => {
  await db.delete("transactions", id);
  dispatch(removeTx(id));
});

export const selectCategories = createSelector(
  [(state: RootState) => state.tx.categories],
  (categories) => Object.keys(categories)
);

export const { editTx, removeTx } = txSlice.actions;
export default txSlice.reducer;
