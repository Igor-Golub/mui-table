export interface FilterMetaData extends Record<string, unknown> {
  group: string;
  renderComponentType: string;
}

export interface Actions {
  findFilterByKey: (key: string) => { id: FilterId; filter: Filter } | null;
}

export enum FilterType {
  String = "string",
  Number = "number",
  Boolean = "boolean",
  Array = "array",
  Range = "range",
}

export type FilterValueMap = {
  [FilterType.String]: string;
  [FilterType.Number]: number;
  [FilterType.Boolean]: boolean;
  [FilterType.Array]: string[];
  [FilterType.Range]: [string, string];
};

export interface Filter<T extends FilterType = FilterType>
  extends FilterValue<T> {
  type: T;
}

export interface FilterDeps {
  action: (currentFilters: Filters, actions: Actions) => void;
}

export interface FilterValue<T extends FilterType = FilterType> {
  key?: string;
  options?: string[];
  deps?: FilterDeps[];
  conditions?: string[];
  value: FilterValueMap[T] | null;
  metaData?: FilterMetaData;
}

export type FilterId = string;

export type Filters = Record<FilterId, Filter>;

export interface FilterSync {
  storage: boolean;
}

export interface IFilterSync {
  write: (value: Filters) => void;
  read: () => Filters;
}
