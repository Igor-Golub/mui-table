import { createContext } from "react";
import { ColumnsContext } from "./types";

export const columnsManagerContext = createContext<ColumnsContext>({
  columnsValues: {},
  handleChangeColumns: () => {},
});
