import { TablePagination } from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useTableManagerContext } from "../contexts";

export const Pagination = () => {
  const { page, limit, total, handleChangePage, handleChangeRowsPerPage } =
    useTableManagerContext();

  return (
    <TablePagination
      page={page}
      count={total}
      component="div"
      rowsPerPage={limit}
      ActionsComponent={TablePaginationActions}
      rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
      onPageChange={(_, page) => handleChangePage(page)}
      onRowsPerPageChange={(event) =>
        handleChangeRowsPerPage(parseInt(event.target.value, 10))
      }
    />
  );
};
