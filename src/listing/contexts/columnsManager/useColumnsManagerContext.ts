import { useContext } from "react";
import { ColumnsContext } from "./types";
import { columnsManagerContext } from "./columnsManagerContext";
import { BaseTableEntity } from "../../types";

export function useColumnsManagerContext<
  TableEntity extends BaseTableEntity,
>() {
  return useContext<ColumnsContext<TableEntity>>(columnsManagerContext);
}
