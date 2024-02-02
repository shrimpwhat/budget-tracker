import AddButton from "./Components/Modal/OpenModalBtn";
import "./App.scss";
import Overview from "./Components/Overview/Overview";
import Table from "./Components/Table/Table";
import Charts from "./Components/Charts/Container";

function App() {
  return (
    <div className="App">
      <AddButton />
      <Overview />
      <Table />
      <Charts />
    </div>
  );
}

export default App;
