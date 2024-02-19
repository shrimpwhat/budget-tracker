import Table from "../src/Components/Table";
import { setupStore } from "../src/store/store";
import { renderWithProviders } from "./test-utils";
import { postTx } from "../src/store/txSlice";
import { fireEvent, waitFor, cleanup } from "@testing-library/react";

interface LocalTestContext {
  container: HTMLElement;
  store: ReturnType<typeof setupStore>;
}

describe("Table", () => {
  beforeEach<LocalTestContext>(async (context) => {
    const txs: Tx[] = [
      {
        category: "Salary",
        value: 50000,
        timestamp: new Date().getTime(),
        type: "income",
        note: "",
      },
      {
        category: "Taxi",
        value: 3000,
        timestamp: new Date().getTime(),
        type: "expense",
        note: "",
      },
    ];
    const store = setupStore();
    await Promise.all([
      store.dispatch(postTx(txs[0])),
      store.dispatch(postTx(txs[1])),
    ]);

    const { container } = renderWithProviders(
      <Table disableVirtualization={true} />,
      { store }
    );
    context.store = store;
    context.container = container;
  });

  afterAll(() => {
    cleanup();
  });

  test<LocalTestContext>("should display correct amount of rows", (context) => {
    const rows = context.container.querySelectorAll(".MuiDataGrid-row");
    expect(rows).toHaveLength(2);
  });

  test<LocalTestContext>("should edit transaction", (context) => {
    const firstRow = context.container.querySelectorAll(".MuiDataGrid-row")[0];
    const valueCell = firstRow.querySelector(".table__value-cell")!;

    fireEvent.doubleClick(valueCell);
    const input = valueCell.querySelector("input")!;
    fireEvent.change(input, { target: { value: "200" } });
    fireEvent.click(firstRow);

    waitFor(() => {
      const tx = context.store.getState().tx.transactions[2];
      expect(tx.value).toBe(200);
    });
  });

  test<LocalTestContext>("should delete transaction", (context) => {
    const firstRow = context.container.querySelectorAll(".MuiDataGrid-row")[0];
    const deleteButton = firstRow.querySelector("button")!;
    fireEvent.click(deleteButton);

    waitFor(() => {
      const transactions = context.store.getState().tx.transactions;
      expect(Object.values(transactions)).toHaveLength(1);
    });
  });
});
