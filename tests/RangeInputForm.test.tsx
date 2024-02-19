import { fireEvent, waitFor } from "@testing-library/react";
import RangeInputForm from "../src/Components/RangeInput";
import { setupStore } from "../src/store/store";
import { renderWithProviders } from "./test-utils";
import { postTx } from "../src/store/txSlice";

interface LocalTestContext {
  container: HTMLElement;
  store: ReturnType<typeof setupStore>;
}

describe("RangeInputForm", () => {
  beforeEach<LocalTestContext>(async (context) => {
    const txs: Tx[] = [
      {
        category: "Salary",
        value: 50000,
        timestamp: new Date("2024-01-01").getTime(),
        type: "income",
        note: "",
      },
      {
        category: "Freelance",
        value: 5000,
        timestamp: new Date("2023-10-20").getTime(),
        type: "income",
        note: "",
      },
    ];
    const store = setupStore();
    await Promise.all(txs.map((tx) => store.dispatch(postTx(tx))));
    const { container } = renderWithProviders(<RangeInputForm />, { store });
    context.store = store;
    context.container = container;
  });

  test<LocalTestContext>("should remove transactions from state which are before period start", (context) => {
    const { container, store } = context;
    const inputs = container.querySelectorAll(".range-form__input")!;
    fireEvent.change(inputs[0], { target: { value: "2024-12-31" } });
    waitFor(() => {
      const transactions = Object.values(store.getState().tx.transactions);
      expect(transactions).toHaveLength(1);
      expect(transactions[0].timestamp).toBe(new Date("2024-01-01").getTime());
    });
  });

  test<LocalTestContext>("should remove transactions from state which are after period end", (context) => {
    const { container, store } = context;
    const inputs = container.querySelectorAll(".range-form__input")!;
    fireEvent.change(inputs[1], { target: { value: "2024-12-31" } });
    waitFor(() => {
      const transactions = Object.values(store.getState().tx.transactions);
      expect(transactions).toHaveLength(1);
      expect(transactions[0].timestamp).toBe(new Date("2023-10-20").getTime());
    });
  });

  test<LocalTestContext>("should remove transactions from state which aren't inside date period", (context) => {
    const { container, store } = context;
    const inputs = container.querySelectorAll(".range-form__input")!;
    fireEvent.change(inputs[0], { target: { value: "2024-12-1" } });
    fireEvent.change(inputs[1], { target: { value: "2024-12-31" } });
    waitFor(() => {
      const transactions = Object.values(store.getState().tx.transactions);
      expect(transactions).toHaveLength(0);
    });
  });
});
