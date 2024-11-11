
import { Dispatch, SetStateAction } from "react";
import { Checkbox } from "@mui/material";
import { BaseTableEntity } from "../../types.ts";

interface Props<TableEntity extends BaseTableEntity> {
  entity: TableEntity;
  isSelected: boolean;
  setSelectedRows: Dispatch<SetStateAction<string[]>>;
  onSelect?: (selectedRowId: string, selectedRows: string[]) => void;
}

export const Select = <TableEntity extends BaseTableEntity>({
  entity,
  onSelect,
  isSelected,
  setSelectedRows,
}: Props<TableEntity>) => {
  return (
    <Checkbox
      checked={isSelected}
      onChange={() => {
        if (onSelect) {
          setSelectedRows((prev) => {
            const nextValue = prev.includes(entity.id)
              ? prev.filter((id) => id !== entity.id)
              : [...prev, entity.id];

            onSelect(entity.id, nextValue);

            return nextValue;
          });
        }
      }}
    />
  );
};
