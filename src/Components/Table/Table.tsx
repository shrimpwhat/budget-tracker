/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  ruRU,
  GridRenderCellParams,
  GridPreProcessEditCellProps,
  GridValueSetterParams,
  GridRowModel,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useMemo, useCallback } from "react";
import "./table.scss";
import { Tooltip } from "@mui/material";
import { CurrencyString } from "../../utils";
import { deleteTx, selectCategories, updateTx } from "../../store/txSlice";
import DeleteIcon from "../../assets/Delete.svg?react";

export default function Table() {
  const transactions = useAppSelector((state) => state.tx.transactions);
  const categories = useAppSelector(selectCategories);

  const dispatch = useAppDispatch();

  const handleRowUpdate = (updated: GridRowModel, original: GridRowModel) => {
    let equal = true;
    for (const key in updated) {
      if (updated[key] !== original[key]) {
        equal = false;
        break;
      }
    }

    if (!equal)
      dispatch(
        updateTx({
          id: Number(updated.id),
          newTx: {
            type: updated.type,
            category: updated.category,
            value: updated.value,
            timestamp: updated.timestamp,
            note: updated.note,
          },
        })
      );

    return updated;
  };

  const handleDelete = useCallback(
    (id: number) => {
      dispatch(deleteTx(id));
    },
    [dispatch]
  );

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "type",
        headerName: "Тип",
        flex: 0.5,
        type: "singleSelect",
        editable: true,
        valueOptions: [
          { value: "income", label: "Доходы" },
          { value: "expense", label: "Расходы" },
        ],
        renderCell: (
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
        field: "category",
        headerName: "Категория",
        flex: 0.7,
        type: "singleSelect",
        valueOptions: categories,
        editable: true,
      },
      {
        field: "value",
        headerName: "Сумма",
        flex: 0.6,
        type: "number",
        valueFormatter: ({ value }: { value: number }) => CurrencyString(value),
        headerAlign: "left",
        align: "left",
        editable: true,
        cellClassName: "table__value-cell",
        preProcessEditCellProps: (
          params: GridPreProcessEditCellProps<number>
        ) => {
          const hasError = (params.props.value ?? 0) <= 0;
          return { ...params.props, error: hasError };
        },
      },
      {
        field: "timestamp",
        headerName: "Дата",
        flex: 0.4,
        type: "date",
        valueGetter: ({ value }: { value: number }) => new Date(value),
        valueSetter: (params: GridValueSetterParams) => {
          const date = new Date(params.value as string);
          const timestamp = date.getTime();
          return { ...params.row, timestamp };
        },
        preProcessEditCellProps: (
          params: GridPreProcessEditCellProps<string>
        ) => {
          const hasError = !params.props.value;
          return { ...params.props, error: hasError };
        },
        editable: true,
      },
      {
        field: "note",
        headerName: "Описание",
        flex: 1,
        editable: true,

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
      {
        field: "delete",
        type: "actions",
        cellClassName: "table__delete-cell",
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<DeleteIcon className="table__delete-icon" />}
              label="Удалить"
              onClick={() => handleDelete(Number(id))}
            />,
          ];
        },
      },
    ],
    [categories, handleDelete]
  );

  const rows: GridRowsProp = useMemo(() => {
    return Object.entries(transactions).map(([id, tx]) => {
      return {
        id,
        ...tx,
      };
    });
  }, [transactions]);

  return (
    <div className="table">
      <DataGrid
        rows={rows}
        columns={columns}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        sortingOrder={["desc", "asc"]}
        initialState={{
          sorting: {
            sortModel: [{ field: "timestamp", sort: "desc" }],
          },
        }}
        disableRowSelectionOnClick
        processRowUpdate={handleRowUpdate}
        onProcessRowUpdateError={(error) => console.error(error)}
      />
    </div>
  );
}
