import { TableFooter as MUITableFooter, TableRow } from "@mui/material";
import { Pagination as PaginationComponent } from "./Pagination.tsx";

export const TableFooter = () => {
  return (
    <MUITableFooter>
      <TableRow>
        <PaginationComponent />
      </TableRow>
    </MUITableFooter>
  );
};
