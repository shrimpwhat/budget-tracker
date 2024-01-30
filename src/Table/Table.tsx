import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  ruRU,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useAppSelector } from "../store/hooks";
import { useMemo } from "react";
import "./table.scss";

export default function Table() {
  const transactions = useAppSelector((state) => state.tx.transactions);
  const categories = useAppSelector((state) => state.tx.categories);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "col1",
        headerName: "Тип",
        flex: 1,
        type: "singleSelect",
        valueOptions: [
          { value: "income", label: "Доходы" },
          { value: "expense", label: "Расходы" },
        ],
        renderCell: (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          params: GridRenderCellParams<any, "income" | "expense">
        ) => (
          <strong
            className={`table__type-cell ${
              params.value === "income"
                ? "table__type-cell__income"
                : "table__type-cell__expense"
            }`}
          >
            {params.formattedValue}
          </strong>
        ),
      },
      {
        field: "col2",
        headerName: "Категория",
        flex: 1,
        type: "singleSelect",
        valueOptions: categories,
      },
      {
        field: "col3",
        headerName: "Сумма",
        flex: 1,
        type: "number",
        valueFormatter: ({ value }: { value: number }) =>
          value.toLocaleString("ru-RU", { style: "currency", currency: "RUB" }),
      },
      {
        field: "col4",
        headerName: "Дата",
        flex: 1,
        type: "date",
        valueGetter: ({ value }: { value: number }) => new Date(value),
      },
      { field: "col5", headerName: "Описание", flex: 1 },
    ],
    []
  );

  const rows: GridRowsProp = useMemo(
    () =>
      transactions.map((tx) => ({
        id: tx.id,
        col1: tx.type,
        col2: tx.category,
        col3: tx.value,
        col4: tx.timestamp,
        col5: tx.note,
      })),
    [transactions]
  );

  return (
    <div className="table">
      <DataGrid
        rows={rows}
        columns={columns}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
      />
    </div>
  );
}
