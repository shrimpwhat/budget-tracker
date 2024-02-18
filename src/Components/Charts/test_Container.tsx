import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Charts from "./Container";

// Mock the Redux store
const mockStore = createStore(() => ({
  tx: {
    stats: {
      incomes: {
        categories: [
          { name: "Category 1", value: 100 },
          { name: "Category 2", value: 200 },
        ],
      },
      expenses: {
        categories: [
          { name: "Category 3", value: 300 },
          { name: "Category 4", value: 400 },
        ],
      },
      networth: [500, 600, 700],
    },
  },
}));

test("renders Charts component", () => {
  render(
    <Provider store={mockStore}>
      <Charts />
    </Provider>
  );

  // Add your assertions here
});
