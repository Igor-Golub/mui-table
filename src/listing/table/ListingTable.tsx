import { useMemo } from "react";
import { Paper, Table, TableContainer } from "@mui/material";
import { TableBody } from "./TableBody";
import { TableHeader } from "./TableHeader";
import { TableFooter } from "./TableFooter";
import { useTableManagerContext } from "../contexts";
import { NumberCell, SelectCell } from "./innerColumns";
import { useColumnsManagerContext } from "../contexts/columnsManager";
import { BaseTableEntity, Column, ColumnsConfiguration } from "../types";

interface Props<TableEntity extends BaseTableEntity> {
  withNumber?: boolean;
  columns: Column<TableEntity>[];
  onRowClick?: (row: TableEntity) => void;
  columnsConfigurator?: ColumnsConfiguration;
  onSelect?: (selectedRowId: string, selectedRows: string[]) => void;
}

export const ListingTable = <TableEntity extends BaseTableEntity>({
  columns,
  onSelect,
  withNumber,
  onRowClick,
  columnsConfigurator,
}: Props<TableEntity>) => {
  const { selectedRows } = useTableManagerContext();
  const { columnsValues } = useColumnsManagerContext<TableEntity>();

  // TODO move columns integration to other place

  const innerColumns = useMemo(() => {
    const numberColumn: Column<TableEntity> = {
      header: "#",
      dataKey: "number",
      bodyCellProps: { align: "center" },
      headerCellProps: { align: "center" },
      renderCell: (entity) => (
        <NumberCell
          key={`number_${entity.id}`}
          entityRenderIndex={entity.renderIndex}
        />
      ),
    };

    const selectColum: Column<TableEntity> = {
      header: "Select",
      dataKey: "select",
      renderCell: (entity) => (
        <SelectCell
          entity={entity}
          onSelect={onSelect}
          key={`select_${entity.id}`}
        />
      ),
    };

    return [numberColumn, selectColum, ...columns]
      .filter((column) => {
        if (column.dataKey === "number" && !withNumber) return false;
        if (column.dataKey === "select" && !onSelect) return false;

        return true;
      })
      .filter(({ dataKey }) => columnsValues?.[dataKey] ?? true);
  }, [onSelect, columns, withNumber, columnsValues]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer style={{ height: "600px" }}>
        <Table stickyHeader>
          <TableHeader
            columns={innerColumns}
            columnsConfigurator={columnsConfigurator}
          />

          <TableBody columns={innerColumns} onRowClick={onRowClick} />
        </Table>
      </TableContainer>

      <TableFooter isSelected={!!onSelect} selectedRows={selectedRows} />
    </Paper>
  );
};
