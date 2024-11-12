import { Checkbox } from "@mui/material";
import { BaseTableEntity } from "../../types.ts";
import { useTableManagerContext } from "../../contexts";

interface Props<TableEntity extends BaseTableEntity> {
  entity: TableEntity;
  onSelect?: (selectedRowId: string, selectedRows: string[]) => void;
}

export const Select = <TableEntity extends BaseTableEntity>({
  entity,
  onSelect,
}: Props<TableEntity>) => {
  const { selectedRows, handleChangeSelectedRows } = useTableManagerContext();

  return (
    <Checkbox
      checked={selectedRows.includes(entity.id)}
      onChange={() => {
        if (onSelect) {
          handleChangeSelectedRows((prev) => {
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
