import { Stack, Typography } from "@mui/material";
import { useFiltersManagerContext } from "../contexts";
import { Columns } from "./Columns";
import { Filters } from "./Filters";
import { BaseTableEntity, Column } from "../types.ts";

interface Props<TableEntity extends BaseTableEntity> {
  columns: Column<TableEntity>[];
}

export const TableConfigurationPanel = <TableEntity extends BaseTableEntity>({
  columns,
}: Props<TableEntity>) => {
  const { handleResetFilters } = useFiltersManagerContext();

  return (
    <Stack>
      <Typography component="span" variant="subtitle1">
        Manager
      </Typography>

      <Stack direction="row" gap="0.5rem">
        <Columns<TableEntity> columns={columns} />

        <Filters onReset={handleResetFilters} />
      </Stack>
    </Stack>
  );
};
