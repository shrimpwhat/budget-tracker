import AddButton from "./Components/Modal/OpenModalBtn";
import "./App.scss";
import Overview from "./Components/Overview";
import Table from "./Components/Table";
import Charts from "./Components/Charts";
import RangeInputForm from "./Components/RangeInput";
import ThemeToggle from "./Components/ThemeToggle";

function App() {
  return (
    <div className="App">
      <ThemeToggle />
      <RangeInputForm />
      <AddButton />
      <Overview />
      <Table disableVirtualization={false} />
      <Charts />
    </div>
  );
}

export default App;
