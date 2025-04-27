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

export interface Filter<
  T extends FilterType = FilterType,
  Key extends string = string,
> extends FilterValue<T, Key> {
  type: T;
}

export interface FilterValue<
  T extends FilterType = FilterType,
  Key extends string = string,
> {
  key: Key;
  options?: string[];
  conditions?: string[];
  value: FilterValueMap[T] | null;
}

export type FilterId = string;

export type Filters<Key extends string = string> = Record<
  FilterId,
  Filter<FilterType, Key>
>;

export interface FilterSync {
  storage: boolean;
  url: boolean;
}

export interface IFilterSync<Key extends string = string> {
  write: (value: Filters<Key>) => void;
  delete: (id: FilterId, filter: Filter<FilterType, Key>) => void;
  read: () => Filters<Key>;
  clear: () => void;
}
