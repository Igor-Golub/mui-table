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
  renderIndex: number;
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

export type InputPropsByType = {
  [InputTypes.Text]: Omit<TextFieldProps, "value" | "onChange">;
  [InputTypes.Select]: Omit<SelectProps, "value" | "onChange"> & {
    options: { label: string; value: string }[];
  };
  [InputTypes.Checkbox]: Omit<CheckboxProps, "value" | "onChange"> & {
    label: string;
  };
};

export type FiltersConfiguration<TableEntity extends BaseTableEntity> = {
  [Key in InputTypes]: {
    inputType: Key;
    filterValue: string;
    fields: (keyof TableEntity)[];
    inputProps: InputPropsByType[Key];
  };
}[InputTypes];

export type FilterComponentsMapper = {
  [Key in InputTypes]: (
    inputProps: InputPropsByType[Key],
    filterValue: string,
  ) => ReactNode;
};

export type ColumnsConfiguration = {
  canHideColumn: boolean;
};
