import { Stack, Typography } from "@mui/material";
import { useFiltersManagerContext } from "../contexts";
import { Columns } from "./Columns";
import { Filters } from "./Filters";
import { Selections } from "./Selections";
import { BaseTableEntity, Column } from "../types.ts";

interface Props<TableEntity extends BaseTableEntity> {
  selectedRows: string[];
  columns: Column<TableEntity>[];
}

export const TableConfigurationPanel = <TableEntity extends BaseTableEntity>({
  columns,
  selectedRows,
}: Props<TableEntity>) => {
  const { handleResetFilters } = useFiltersManagerContext();

  return (
    <Stack>
      <Typography component="span" variant="subtitle1">
        Manager
      </Typography>

      <Stack direction="row" gap="0.5rem">
        <Selections selectedRows={selectedRows} />

        <Columns<TableEntity> columns={columns} />

        <Filters onReset={handleResetFilters} />
      </Stack>
    </Stack>
  );
};
