import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { filtersManagerContext as FiltersManagerContext } from "./filtersManagerContext.ts";

export const FiltersContextProvider = ({ children }: PropsWithChildren) => {
  const [filtersValues, setFiltersValues] = useState<
    Record<string, string | boolean>
  >({});

  const handleChangeFilters = useCallback(
    (field: string, nextValue: string | boolean) => {
      setFiltersValues((prev) => ({
        ...prev,
        [field]: nextValue,
      }));
    },
    [],
  );

  const handleResetFilters = useCallback(() => {
    setFiltersValues({});
  }, []);

  const value = useMemo(
    () => ({ filtersValues, handleChangeFilters, handleResetFilters }),
    [filtersValues],
  );

  return (
    <FiltersManagerContext.Provider value={value}>
      {children}
    </FiltersManagerContext.Provider>
  );
};
