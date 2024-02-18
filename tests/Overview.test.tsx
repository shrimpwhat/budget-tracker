import Overview from "../src/Components/Overview/Overview";
import { setupStore } from "../src/store/store";
import { renderWithProviders } from "./test-utils";
import { postTx } from "../src/store/txSlice";
import { CurrencyString } from "../src/utils";
import { waitFor } from "@testing-library/react";

describe("Overview", () => {
  test("should correctly render overview information", async () => {
    const store = setupStore();
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
    await Promise.all(txs.map((tx) => store.dispatch(postTx(tx))));

    const { container } = renderWithProviders(<Overview />, { store });

    const incomeCard = container.querySelector(".income")!,
      expenseCard = container.querySelector(".expense")!;

    waitFor(() => {
      expect(incomeCard.querySelector(".card__title-sum")!).toHaveTextContent(
        CurrencyString(55000)
      );

      expect(expenseCard.querySelector(".card__title-sum")!).toHaveTextContent(
        CurrencyString(23000)
      );
      const incomeDesc = incomeCard.querySelectorAll("list-item__description"),
        expenseDesc = expenseCard.querySelectorAll("list-item__description");

      expect(incomeDesc[0]).toHaveTextContent("Salary: 50000");
      expect(incomeDesc[1]).toHaveTextContent("Freelance: 5000");

      expect(expenseDesc[0]).toHaveTextContent("Shopping: 20000");
      expect(expenseDesc[1]).toHaveTextContent("Taxi: 3000");
    });
  });
});
