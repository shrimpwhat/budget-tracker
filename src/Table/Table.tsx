import { DataGrid, GridRowsProp, GridColDef, ruRU } from "@mui/x-data-grid";
import { useAppSelector } from "../store/hooks";

const rows: GridRowsProp = [
  { id: 4, col1: "Hello", col2: "World" },
  { id: 3, col1: "DataGridPro", col2: "is Awesome" },
  { id: 1, col1: "MUI", col2: "is Amazing" },
];

const columns: GridColDef[] = [
  { field: "col1", headerName: "Column 1" },
  { field: "col2", headerName: "Column 2" },
];

export default function Table() {
  const transactions = useAppSelector((state) => state.tx.transactions);

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
      />
    </div>
  );
}
