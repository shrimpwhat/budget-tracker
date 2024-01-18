const AddForm = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className="modal__overlay" onClick={closeModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className="modal__close-button">
          X
        </button>

        <form className="form">
          <div>
            <div>
              <input type="radio" name="type" id="income" required />
              <label htmlFor="income">Доход</label>
            </div>
            <div>
              <input type="radio" name="type" id="expense" />
              <label htmlFor="income">Расход</label>
            </div>
          </div>
          <div>
            <label htmlFor="category-input" className="form__label">
              Категория
            </label>
            <input className="form__input" id="category-input" required />
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
            />
          </div>
          <div>
            <label htmlFor="note-input" className="form__label">
              Комментарий
            </label>
            <input className="form__input" id="note-input" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
