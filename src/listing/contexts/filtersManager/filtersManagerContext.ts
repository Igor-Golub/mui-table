import { createContext } from "react";
import { FiltersContext } from "./types";

export const filtersManagerContext = createContext<FiltersContext>({
  filtersValues: {},
  handleChangeFilters: () => {},
  handleResetFilters: () => {},
});
