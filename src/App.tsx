import AddButton from "./Components/Modal/OpenModalBtn";
import "./App.scss";
import Overview from "./Components/Overview/Overview";
import Table from "./Components/Table/Table";

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
