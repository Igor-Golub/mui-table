import { useContext } from "react";
import { filtersManagerContext } from "./filtersManagerContext.ts";

export function useFiltersManagerContext() {
  return useContext(filtersManagerContext);
}
