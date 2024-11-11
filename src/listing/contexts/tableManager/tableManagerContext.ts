import { createContext } from "react";
import { TableContext } from "./types";

export const tableManagerContext = createContext<TableContext>({
  page: 0,
  total: 0,
  limit: 0,
  tableData: [],
  handleChangePage: () => {},
  handleChangeRowsPerPage: () => {},
});
