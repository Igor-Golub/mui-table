import { BaseTableEntity, Pagination } from "../../types";

export interface TableContextValues<TableEntity extends BaseTableEntity>
  extends Pagination {
  tableData: TableEntity[];
}

export interface TableContext<TableEntity extends BaseTableEntity = any>
  extends TableContextValues<TableEntity> {
  handleChangePage: (nextValue: number) => void;
  handleChangeRowsPerPage: (nextValue: number) => void;
}
