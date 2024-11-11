import {
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { BaseTableEntity, Column, ColumnsConfiguration } from "../types.ts";
import { useColumnsManagerContext } from "../contexts/columnsManager";

interface Props<TableEntity extends BaseTableEntity> {
  columns: Column<TableEntity>[];
  columnsConfigurator?: ColumnsConfiguration;
}

export const TableHeader = <TableEntity extends BaseTableEntity>({
  columns,
  columnsConfigurator,
}: Props<TableEntity>) => {
  const { handleChangeColumns } = useColumnsManagerContext<TableEntity>();

  return (
    <TableHead>
      <TableRow>
        {columns.map(
          ({ headerComponent, header, headerCellProps = {}, dataKey }) => (
            <TableCell key={header} {...headerCellProps}>
              {headerComponent || header}

              {columnsConfigurator?.canHideColumn && (
                <Tooltip title="Hide column">
                  <IconButton
                    size="small"
                    onClick={() => handleChangeColumns(dataKey)}
                  >
                    &#10005;
                  </IconButton>
                </Tooltip>
              )}
            </TableCell>
          ),
        )}
      </TableRow>
    </TableHead>
  );
};
