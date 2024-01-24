import AddButton from "./Modal/AddButton";
import RangeInputForm from "./DateRange/RangeInputForm";
import "./App.scss";
import { useAppSelector } from "./store/hooks";

function App() {
  const txs = useAppSelector((state) => state.tx.transactions);

  return (
    <div className="App">
      <AddButton />
      <RangeInputForm />
      {txs.map((tx) => JSON.stringify(tx))}
    </div>
  );
}

export default App;
