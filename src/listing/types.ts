import { ReactNode } from "react";
import {
  TableCellProps,
  TextFieldProps,
  SelectProps,
  CheckboxProps,
} from "@mui/material";

export interface BaseTableEntity
  extends Record<string, string | number | boolean | undefined> {
  id: string;
}

export interface Column<TableEntity extends BaseTableEntity> {
  header: string;
  headerComponent?: ReactNode;
  bodyCellProps?: TableCellProps;
  headerCellProps?: TableCellProps;
  dataKey: keyof TableEntity | string;
  renderCell?: (entity: TableEntity, rowIndex: number) => ReactNode;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export enum InputTypes {
  Text = "text",
  Select = "select",
  Checkbox = "checkbox",
}

type InputPropsByType = {
  [InputTypes.Text]: Omit<TextFieldProps, "value" | "onChange">;
  [InputTypes.Select]: Omit<SelectProps, "value" | "onChange"> & {
    options: { label: string; value: string }[];
  };
  [InputTypes.Checkbox]: Omit<CheckboxProps, "value" | "onChange"> & {
    label: string;
  };
};

export type FiltersConfiguration<TableEntity extends BaseTableEntity> = {
  [K in InputTypes]: {
    inputType: K;
    filterValue: string;
    fields: (keyof TableEntity)[];
    inputProps: InputPropsByType[K];
  };
}[InputTypes];

export type FilterComponentsMapper = Record<
  InputTypes,
  (inputProps: any, filterValue: any) => any
>;

export type ColumnsConfiguration = {
  canHideColumn: boolean;
};
