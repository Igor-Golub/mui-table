import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { columnsManagerContext as ColumnsManagerContext } from "./columnsManagerContext.ts";
import { BaseTableEntity } from "../../types";
import { ColumnsContext } from "./types.ts";

export const ColumnsManagerContextProvider = <
  TableEntity extends BaseTableEntity,
>({
  children,
}: PropsWithChildren) => {
  const [columnsValues, setColumnsValues] = useState<
    Partial<Record<keyof TableEntity | string, boolean>>
  >({});

  const handleChangeColumns = useCallback(
    (field: keyof TableEntity | string) => {
      setColumnsValues((prev) => {
        if (field in prev) {
          return { ...prev, [field]: !prev[field] };
        }

        return { ...prev, [field]: false };
      });
    },
    [],
  );

  const value = useMemo<ColumnsContext<TableEntity>>(
    () => ({ columnsValues, handleChangeColumns }),
    [columnsValues],
  );

  return (
    <ColumnsManagerContext.Provider value={value}>
      {children}
    </ColumnsManagerContext.Provider>
  );
};
