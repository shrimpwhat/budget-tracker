import { ChangeEvent, FormEvent, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import CancelIcon from "../assets/cancel.svg";
import { addTx } from "../store/txSlice";

const AddForm = ({ closeModal }: { closeModal: () => void }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.tx.categories);

  const txType = useRef<"0" | "1">("0");
  const txCategory = useRef<HTMLInputElement>(null);
  const txValue = useRef<HTMLInputElement>(null);
  const txDate = useRef<HTMLInputElement>(null);
  const txNote = useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const category = txCategory.current?.value; // TODO: validate category string
    const value = txValue.current?.valueAsNumber;
    const date = txDate.current?.valueAsDate;
    if (!category) {
      alert("Введите корректную категорию");
      return;
    }
    if (!value) {
      alert("Введите корректную сумму");
      return;
    }
    if (!date) {
      alert("Введите корректную дату");
      return;
    }

    dispatch(
      addTx({
        type: txType.current,
        category: txCategory.current.value,
        value,
        date,
        note: txNote.current?.value ?? "",
      })
    );
  };

  const changeType = (e: ChangeEvent<HTMLInputElement>) => {
    txType.current = e.target.value as "0" | "1";
  };

  return (
    <div className="modal__overlay" onClick={closeModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} style={{ float: "right" }}>
          <img src={CancelIcon} alt="" className="modal__close-icon" />
        </button>

        <form className="form" onSubmit={submit}>
          <div className="type-container">
            <label>
              <input
                type="radio"
                name="type"
                id="income"
                required
                defaultChecked
                value={0}
                onChange={changeType}
              />
              <span>Доходы</span>
            </label>
            <label>
              <input
                type="radio"
                name="type"
                id="expense"
                value={1}
                onChange={changeType}
              />
              <span>Расходы</span>
            </label>
          </div>
          <div>
            <label htmlFor="category-input" className="form__label">
              Категория
            </label>
            <input
              className="form__input"
              id="category-input"
              required
              list="categories"
              ref={txCategory}
            />
            <datalist id="categories">
              {categories.map((category, index) => (
                <option key={index} value={category} />
              ))}
            </datalist>
          </div>
          <div>
            <label htmlFor="value-input" className="form__label">
              Сумма
            </label>
            <input
              className="form__input"
              id="value-input"
              type="number"
              min="0"
              required
              ref={txValue}
            />
          </div>
          <div>
            <label htmlFor="date-input" className="form__label">
              Дата
            </label>
            <input
              className="form__input"
              id="date-input"
              type="date"
              required
              ref={txDate}
            />
          </div>
          <div>
            <label htmlFor="note-input" className="form__label">
              Комментарий
            </label>
            <input className="form__input" id="note-input" ref={txNote} />
          </div>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
