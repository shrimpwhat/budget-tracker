import AddButton from "./Modal/AddButton";
import "./App.scss";
import Overview from "./Overview/Overview";
import Table from "./Table/Table";

function App() {
  return (
    <div className="App">
      <AddButton />
      <Overview />
      <Table />
    </div>
  );
}

export default App;
