import { BaseTableEntity } from "../../types.ts";

export interface ColumnsContextValues<TableEntity extends BaseTableEntity> {
  columnsValues: Partial<Record<keyof TableEntity | string, boolean>>;
}

export interface ColumnsContext<TableEntity extends BaseTableEntity = any>
  extends ColumnsContextValues<TableEntity> {
  handleChangeColumns: (field: keyof TableEntity | string) => void;
}
