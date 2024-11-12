import {
  TableCell,
  TableFooter as MUITableFooter,
  TableRow,
  Typography,
} from "@mui/material";
import { Pagination as PaginationComponent } from "./Pagination";

interface Props {
  isSelected: boolean;
  selectedRows: string[];
}

export const TableFooter = ({ isSelected, selectedRows }: Props) => {
  return (
    <MUITableFooter>
      <TableRow>
        {isSelected && (
          <TableCell>
            <Typography component="span" variant="body2">
              Selected: {selectedRows.length}
            </Typography>
          </TableCell>
        )}

        <PaginationComponent />
      </TableRow>
    </MUITableFooter>
  );
};
