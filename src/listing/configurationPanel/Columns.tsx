import { MouseEvent, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Popover,
  Stack,
} from "@mui/material";
import { BaseTableEntity, Column } from "../types";
import { useColumnsManagerContext } from "../contexts/columnsManager";

interface Props<TableEntity extends BaseTableEntity> {
  columns: Column<TableEntity>[];
}

export const Columns = <TableEntity extends BaseTableEntity>({
  columns,
}: Props<TableEntity>) => {
  const { handleChangeColumns, columnsValues } =
    useColumnsManagerContext<TableEntity>();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Columns
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack padding="1rem" gap="0.5rem" minWidth="18rem">
          <Stack gap="0.5rem">
            {columns.map(({ header, dataKey }) => (
              <FormControlLabel
                key={header}
                label={header}
                control={
                  <Checkbox
                    checked={columnsValues[dataKey] ?? true}
                    onChange={() => handleChangeColumns(dataKey)}
                  />
                }
              />
            ))}
          </Stack>
        </Stack>
      </Popover>
    </>
  );
};
