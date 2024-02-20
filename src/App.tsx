import AddButton from "./Components/Modal/OpenModalBtn";
import "./App.scss";
import Overview from "./Components/Overview";
import Table from "./Components/Table";
import Charts from "./Components/Charts";
import RangeInputForm from "./Components/RangeInput";
import ThemeToggle from "./Components/ThemeToggle";
import { ThemeProvider } from "@emotion/react";
import { useAppSelector } from "./store/hooks";
import { createTheme } from "@mui/material";

function App() {
  const { mode } = useAppSelector((state) => state.theme);

  return (
    <div className="App">
      <div className="svg-background"></div>
      <div className="app-container">
        <header className="header">
          <ThemeToggle />
          <RangeInputForm />
        </header>
        <main>
          <AddButton />
          <Overview />
          <ThemeProvider theme={createTheme({ palette: { mode } })}>
            <Table disableVirtualization={false} />
            <Charts />
          </ThemeProvider>
        </main>
        <footer></footer>
      </div>
    </div>
  );
}

export default App;
