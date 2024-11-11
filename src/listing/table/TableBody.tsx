import { Fragment } from "react";
import { TableBody as MUITableBody, TableCell, TableRow } from "@mui/material";
import { useTableManagerContext } from "../contexts";
import { BaseTableEntity, Column } from "../types";

interface Props<TableEntity extends BaseTableEntity> {
  columns: Column<TableEntity>[];
}

export const TableBody = <TableEntity extends BaseTableEntity>({
  columns,
}: Props<TableEntity>) => {
  const { page, limit } = useTableManagerContext();
  const { tableData } = useTableManagerContext<TableEntity>();

  return (
    <MUITableBody>
      {(limit > 0
        ? tableData.slice(page * limit, page * limit + limit)
        : tableData
      ).map((row, rowIndex) => (
        <Fragment key={row.id}>
          <TableRow>
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
