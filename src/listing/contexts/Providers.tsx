import { PropsWithChildren } from "react";
import { TableManagerContextProvider } from "./tableManager";
import { FiltersContextProvider } from "./filtersManager";
import { ColumnsManagerContextProvider } from "./columnsManager";
import { BaseTableEntity, FiltersConfiguration } from "../types.ts";

interface Props<TableEntity extends BaseTableEntity> {
  tableData: TableEntity[];
  groupBy?: keyof TableEntity;
  filtersConfiguration?: FiltersConfiguration<TableEntity>[];
}

export const Providers = <TableEntity extends BaseTableEntity>({
  children,
  ...other
}: PropsWithChildren<Props<TableEntity>>) => {
  return (
    <FiltersContextProvider>
      <ColumnsManagerContextProvider<TableEntity>>
        <TableManagerContextProvider<TableEntity> {...other}>
          {children}
        </TableManagerContextProvider>
      </ColumnsManagerContextProvider>
    </FiltersContextProvider>
  );
};
