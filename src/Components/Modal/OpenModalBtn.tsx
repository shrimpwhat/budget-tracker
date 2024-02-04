import { useState } from "react";
import AddForm from "./AddForm";
import "./modal.scss";
import PlusIcon from "../../assets/Plus.svg?react";

const AddButton = () => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="add-container">
      <button
        onClick={() => setOpened(true)}
        className="add-container__open-button btn-primary"
      >
        <PlusIcon />
      </button>
      {opened && (
        <div className="modal">
          <AddForm closeModal={() => setOpened(false)} />
        </div>
      )}
    </div>
  );
};

export default AddButton;
