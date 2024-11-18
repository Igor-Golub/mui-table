import { Fragment, useMemo, SyntheticEvent } from "react";
import { grey } from "@mui/material/colors";
import { TableBody as MUITableBody, TableCell, TableRow } from "@mui/material";
import { useTableManagerContext } from "../contexts";
import { BaseTableEntity, Column } from "../types";

interface Props<TableEntity extends BaseTableEntity> {
  columns: Column<TableEntity>[];
  onRowClick?: (row: TableEntity) => void;
}

export const TableBody = <TableEntity extends BaseTableEntity>({
  columns,
  onRowClick,
}: Props<TableEntity>) => {
  const { page, limit } = useTableManagerContext();
  const { tableData } = useTableManagerContext<TableEntity>();

  const tableDataWithPagination = useMemo(
    () =>
      limit > 0
        ? tableData.slice(page * limit, page * limit + limit)
        : tableData,
    [limit, page, tableData],
  );

  const handleRowClick = (event: SyntheticEvent, row: TableEntity) => {
    if (typeof onRowClick !== "function") return;

    event.stopPropagation();

    onRowClick(row);
  };

  return (
    <MUITableBody>
      {tableDataWithPagination.map((row, rowIndex) => (
        <Fragment key={row.id}>
          <TableRow
            onClick={(event) => {
              handleRowClick(event, row);
            }}
            sx={{
              "&:hover": {
                cursor: onRowClick ? "pointer" : "default",
                background: onRowClick ? grey["A100"] : "whit",
              },
            }}
          >
            {columns.map(({ dataKey, renderCell, bodyCellProps = {} }) => (
              <TableCell
                key={`${row.id}_${dataKey.toString()}`}
                {...bodyCellProps}
              >
                {renderCell?.(row, rowIndex) ?? row[dataKey]}
              </TableCell>
            ))}
          </TableRow>
        </Fragment>
      ))}
    </MUITableBody>
  );
};
