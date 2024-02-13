import { describe, expect, test, vi } from "vitest";
import { renderWithProviders } from "../../utils/test-utils";
import AddForm from "./AddForm";
import { setupStore } from "../../store/store";
import { fireEvent } from "@testing-library/react";

describe("Add form", () => {
  test("should add transaction to store", () => {
    const store = setupStore();
    const { getByLabelText, getByText } = renderWithProviders(
      <AddForm closeModal={vi.fn()} />,
      { store }
    );

    const dateString = "20-01-2024";
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

    fireEvent.click(getByText("Сохранить"));

    const tx = store.getState().tx.transactions[0];
    expect(tx).toEqual(inputData);
  });
});
