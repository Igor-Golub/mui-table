import { useContext } from "react";
import { tableManagerContext } from "./tableManagerContext.ts";
import { TableContext } from "./types.ts";
import { BaseTableEntity } from "../../types.ts";

export function useTableManagerContext<TableEntity extends BaseTableEntity>() {
  return useContext<TableContext<TableEntity>>(tableManagerContext);
}
