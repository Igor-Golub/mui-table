import {
  Filters,
  IFilterSync,
  FilterType,
  Filter,
  FilterValueUnion,
} from "../types";
import { Location, useNavigate } from "react-router-dom";

const serializeMappers: Record<FilterType, (value: any) => string> = {
  [FilterType.String]: (value: string) => encodeURIComponent(value),
  [FilterType.Number]: (value: number) => value.toString(),
  [FilterType.Boolean]: (value: boolean) => (value ? "1" : "0"),
  [FilterType.Array]: (value: string[]) =>
    value.map((v) => encodeURIComponent(v)).join(";"),
  [FilterType.Range]: (value: [string, string]) =>
    value.map((v) => encodeURIComponent(v)).join("-"),
};

const deserializeMappers = {
  [FilterType.String]: (value: string) => decodeURIComponent(value),
  [FilterType.Number]: (value: string) => Number(value),
  [FilterType.Boolean]: (value: string) => value === "1",
  [FilterType.Array]: (value: string) =>
    value.split(";").map((v) => decodeURIComponent(v)),
  [FilterType.Range]: (value: string) =>
    value.split("-").map((v) => decodeURIComponent(v)) as [string, string],
};

export class URLSync<Key extends string = string> implements IFilterSync<Key> {
  private readonly prefix = "f" as const;

  private readonly separator = "_" as const;

  constructor(
    private navigate: ReturnType<typeof useNavigate>,
    private location: Location,
  ) {}

  private serializeFilter<T extends FilterType>(
    type: T,
    value: FilterValueUnion,
  ): string {
    if (value === null) return "";
    return serializeMappers[type](value);
  }

  private deserializeFilter<T extends FilterType>(
    type: T,
    value: string,
  ): FilterValueUnion | null {
    if (!value) return null;

    try {
      return deserializeMappers[type](value);
    } catch {
      return null;
    }
  }

  private generateURLKey(key: string, type: FilterType, id: string): string {
    return `${this.prefix}_${id}_${key}_${type}`;
  }

  private updateURL(search: string) {
    this.navigate({ search }, { replace: true });
  }

  public write(filters: Filters): void {
    const params = new URLSearchParams(this.location.search);

    Array.from(params.keys())
      .filter((key) => key.startsWith(this.prefix))
      .forEach((key) => params.delete(key));

    Object.entries(filters).forEach(([id, filter]) => {
      if (filter.value === null) return;

      const paramName = this.generateURLKey(filter.key, filter.type, id);
      const serialized = this.serializeFilter(filter.type, filter.value);

      if (serialized) params.set(paramName, serialized);
    });

    this.updateURL(params.toString());
  }

  public read(): Filters<Key> {
    const params = new URLSearchParams(this.location.search);

    const result: Filters<Key> = {};

    Array.from(params.keys())
      .filter((key) => key.startsWith(this.prefix))
      .forEach((param) => {
        const [_, filterId, filterKey, filterType] = param.split(
          this.separator,
        );

        const type = filterType as FilterType;
        const key = filterKey as Key;

        const valueStr = params.get(param);

        if (type && valueStr !== null) {
          result[filterId] = {
            type,
            key,
            value: this.deserializeFilter(type, valueStr),
          } satisfies Filter<FilterType, Key>;
        }
      });

    return result;
  }

  public delete(id: string, filter: Filter<FilterType, Key>): void {
    const params = new URLSearchParams(this.location.search);
    const paramName = this.generateURLKey(filter.key, filter.type, id);

    params.delete(paramName);

    this.updateURL(params.toString());
  }

  public clear(): void {
    const params = new URLSearchParams(this.location.search);

    Array.from(params.keys())
      .filter((key) => key.startsWith(this.prefix))
      .forEach((key) => params.delete(key));

    this.updateURL(params.toString());
  }
}
