import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Tx = {
  type: "0" | "1";
  category: string;
  value: number;
  date: Date;
  note: string;
};

type State = {
  txs: Tx[];
  categories: string[];
  range?: [Date, Date];
};

const initialState: State = {
  txs: [],
  categories: [],
};

export const txSlice = createSlice({
  name: "tx",
  initialState,
  reducers: {
    addTx: (state, action: PayloadAction<Tx>) => {
      state.txs.push(action.payload);
      const set = new Set(state.categories);
      if (!set.has(action.payload.category)) {
        state.categories.push(action.payload.category);
      }
    },
  },
});

export const { addTx } = txSlice.actions;
export default txSlice.reducer;
