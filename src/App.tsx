import AddButton from "./Components/Modal/OpenModalBtn";
import "./App.scss";
import Overview from "./Components/Overview/Overview";
import Table from "./Components/Table/Table";
import Charts from "./Components/Charts/Container";
import RangeInputForm from "./Components/RangeInput/RangeInputForm";

function App() {
  return (
    <div className="App">
      <RangeInputForm />
      <AddButton />
      <Overview />
      <Table />
      <Charts />
    </div>
  );
}

export default App;
