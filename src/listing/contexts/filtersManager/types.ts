export interface FiltersManagerContextValues {
  filtersValues: Partial<Record<string, string | boolean>>;
}

export interface FiltersContext extends FiltersManagerContextValues {
  handleResetFilters: VoidFunction;
  handleChangeFilters: (field: string, nextValue: string | boolean) => void;
}
