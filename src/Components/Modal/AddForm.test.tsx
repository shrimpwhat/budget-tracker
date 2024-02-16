import { describe, expect, test } from "vitest";
import { renderWithProviders } from "../../../tests/test-utils";
import AddForm from "./AddForm";
import { setupStore } from "../../store/store";
import { fireEvent, waitFor } from "@testing-library/react";

describe("Add form", () => {
  test("should add transaction to store", async () => {
    const store = setupStore();
    const { getByLabelText, container } = renderWithProviders(
      <AddForm closeModal={() => {}} />,
      { store }
    );

    const dateString = "2024-01-20";
    const inputData = {
      type: "income",
      category: "Зарплата",
      value: 1000,
      timestamp: new Date(dateString).getTime(),
      note: "Lorem ipsum",
    };

    const categoryInput = getByLabelText("Категория") as HTMLInputElement;
    fireEvent.change(categoryInput, { target: { value: inputData.category } });

    const valueInput = getByLabelText("Сумма") as HTMLInputElement;
    fireEvent.change(valueInput, { target: { value: inputData.value } });

    const dateInput = getByLabelText("Дата") as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: dateString } });

    const noteInput = getByLabelText("Комментарий") as HTMLInputElement;
    fireEvent.change(noteInput, { target: { value: inputData.note } });

    fireEvent.submit(container.querySelector("form")!);

    await waitFor(() => {
      const tx = store.getState().tx.transactions[1];
      expect(tx).toEqual(inputData);
    });
  });
});
