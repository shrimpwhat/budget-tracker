import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  ruRU,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useAppSelector } from "../../store/hooks";
import { useMemo } from "react";
import "./table.scss";
import { Tooltip } from "@mui/material";
import { CurrencyString } from "../../utils";

export default function Table() {
  const transactions = useAppSelector((state) => state.tx.transactions);
  const categories = useAppSelector((state) => state.tx.categories);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "col1",
        headerName: "Тип",
        flex: 0.5,
        type: "singleSelect",
        editable: true,
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
        flex: 0.7,
        type: "singleSelect",
        valueOptions: categories,
        editable: true,
      },
      {
        field: "col3",
        headerName: "Сумма",
        flex: 0.7,
        type: "number",
        valueFormatter: ({ value }: { value: number }) => CurrencyString(value),
        headerAlign: "left",
        align: "left",
        editable: true,
      },
      {
        field: "col4",
        headerName: "Дата",
        flex: 0.5,
        type: "date",
        valueGetter: ({ value }: { value: number }) => new Date(value),
        editable: true,
      },
      {
        field: "col5",
        headerName: "Описание",
        flex: 1,
        editable: true,

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderCell: (params: GridRenderCellParams<any, string>) => (
          <Tooltip title={params.value}>
            <p
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {params.value}
            </p>
          </Tooltip>
        ),
      },
    ],
    [categories]
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
        sortingOrder={["desc", "asc"]}
        initialState={{
          sorting: {
            sortModel: [{ field: "col4", sort: "desc" }],
          },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
}
