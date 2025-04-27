export interface FilterMetaData<Group extends string = string>
  extends Record<string, unknown> {
  group: Group;
  label: string;
  groupLabel: string;
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

export type FilterValueUnion = FilterValueMap[keyof FilterValueMap];

export interface Filter<T extends FilterType = FilterType>
  extends FilterValue<T> {
  type: T;
}

export interface FilterValue<T extends FilterType = FilterType> {
  key: string;
  options?: string[];
  conditions?: string[];
  value: FilterValueMap[T] | null;
  metaData?: Partial<FilterMetaData>;
}

export type FilterId = string;

export type Filters = Record<FilterId, Filter>;

export interface FilterSync {
  storage: boolean;
  url: boolean;
}

export interface IFilterSync {
  write: (value: Filters) => void;
  delete: (id: FilterId, filter: Filter) => void;
  read: () => Filters;
}
