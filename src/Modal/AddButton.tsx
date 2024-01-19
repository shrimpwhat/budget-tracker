import { useState } from "react";
import AddForm from "./AddForm";
import "./modal.scss";

const AddButton = () => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="add-container">
      <button onClick={() => setOpened(true)}>Добавить...</button>
      {opened && <AddForm closeModal={() => setOpened(false)} />}
    </div>
  );
};

export default AddButton;
