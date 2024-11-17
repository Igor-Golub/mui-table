import { Stack, Typography } from "@mui/material";
import { Pagination as PaginationComponent } from "./Pagination";

interface Props {
  isSelected: boolean;
  selectedRows: string[];
}

export const TableFooter = ({ isSelected, selectedRows }: Props) => {
  return (
    <Stack
      direction="row"
      padding="0 1rem"
      alignItems="center"
      justifyContent="space-between"
    >
      {isSelected && (
        <Typography component="span" variant="body2">
          Selected: {selectedRows.length}
        </Typography>
      )}

      <PaginationComponent />
    </Stack>
  );
};
