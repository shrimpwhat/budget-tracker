import { act, waitFor } from "@testing-library/react";
import Charts from "./Container";
import { setupStore } from "../../store/store";
import { renderWithProviders } from "../../../tests/test-utils";
import { postTx } from "../../store/txSlice";
import { vi } from "vitest";

interface LocalTestContext {
  container: HTMLElement;
  store: ReturnType<typeof setupStore>;
}

describe("Charts", () => {
  const txs: Tx[] = [
    {
      category: "Salary",
      value: 50000,
      timestamp: new Date().getTime(),
      type: "income",
      note: "",
    },
    {
      category: "Freelance",
      value: 5000,
      timestamp: new Date().getTime(),
      type: "income",
      note: "",
    },
    {
      category: "Shopping",
      value: 20000,
      timestamp: new Date().getTime(),
      type: "expense",
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

  beforeAll(() => {
    vi.mock("@mui/x-charts", async (importOriginal) => {
      const mod = await importOriginal<typeof import("@mui/x-charts")>();
      return {
        ...mod,
        PieChart: vi.fn(() => <div></div>),
        LineChart: vi.fn(() => <div></div>),
      };
    });
  });

  beforeEach<LocalTestContext>(async (context) => {
    const store = setupStore();
    const { container } = renderWithProviders(<Charts />, { store });
    context.store = store;
    context.container = container;
  });

  test<LocalTestContext>("should render only incomes pie", async (context) => {
    const { container, store } = context;
    await act(
      async () =>
        await Promise.all(
          txs.slice(0, 3).map((tx) => store.dispatch(postTx(tx)))
        )
    );
    waitFor(() => {
      const pieCharts = container.querySelector(".pie-charts")!;
      const pies = pieCharts.querySelectorAll(".chart");
      expect(pies).toHaveLength(1);
      expect(pies[0].querySelector(".chart__title")!).toHaveTextContent(
        "Доходы"
      );
    });
  });

  test<LocalTestContext>("should render only expenses pie", async (context) => {
    const { container, store } = context;
    await act(
      async () =>
        await Promise.all(
          txs.slice(2, 4).map((tx) => store.dispatch(postTx(tx)))
        )
    );
    waitFor(() => {
      const pieCharts = container.querySelector(".pie-charts")!;
      const pies = pieCharts.querySelectorAll(".chart");
      expect(pies).toHaveLength(1);
      expect(pies[0].querySelector(".chart__title")!).toHaveTextContent(
        "Расходы"
      );
    });
  });

  test<LocalTestContext>("should render pie charts and networth chart", async (context) => {
    const { container, store } = context;
    await act(
      async () => await Promise.all(txs.map((tx) => store.dispatch(postTx(tx))))
    );
    waitFor(() => {
      expect(container.querySelector(".networth-chart")).not.toBeNull();
      const pieCharts = container.querySelector(".pie-charts")!;
      const pies = pieCharts.querySelectorAll(".chart");
      expect(pies).toHaveLength(2);
    });
  });

  test<LocalTestContext>("shouldn't render networth chart with less than 2 transactions", async (context) => {
    const { container, store } = context;
    await store.dispatch(postTx(txs[0]));
    waitFor(() => {
      expect(container.querySelector(".networth-chart")).toBeNull();
    });
  });

  test<LocalTestContext>("shouldn't render pie charts with less than 2 categories", async (context) => {
    const { container, store } = context;

    const similarTxs: Tx[] = [
      {
        category: "Freelance",
        value: 5000,
        timestamp: new Date().getTime(),
        type: "income",
        note: "",
      },
      {
        category: "Freelance",
        value: 5000,
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
      {
        category: "Taxi",
        value: 3000,
        timestamp: new Date().getTime(),
        type: "expense",
        note: "",
      },
    ];

    await Promise.all(similarTxs.map((tx) => store.dispatch(postTx(tx))));

    waitFor(() => {
      const pieCharts = container.querySelector(".pie-charts")!;
      expect(pieCharts.querySelectorAll(".chart")).toHaveLength(0);
    });
  });
});
