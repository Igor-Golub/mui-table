import { Filters, IFilterSync, FilterType } from "../types";
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

export class URLSync implements IFilterSync {
  private readonly prefix = "f_" as const;

  private readonly separator = "_" as const;

  constructor(
    private navigate: ReturnType<typeof useNavigate>,
    private location: Location,
  ) {}

  private serializeFilter<T extends FilterType>(
    type: T,
    value: string | number | boolean | [string, string] | string[],
  ): string {
    if (value === null) return "";
    return serializeMappers[type](value);
  }

  private deserializeFilter<T extends FilterType>(type: T, value: string): any {
    if (!value) return null;

    try {
      return deserializeMappers[type](value);
    } catch {
      return null;
    }
  }

  private generateURLKey(type: FilterType, id: string): string {
    return `${this.prefix}${id}_${type}`;
  }

  public write(filters: Filters): void {
    const params = new URLSearchParams(this.location.search);

    Array.from(params.keys())
      .filter((key) => key.startsWith(this.prefix))
      .forEach((key) => params.delete(key));

    Object.entries(filters).forEach(([id, filter]) => {
      if (filter.value === null) return;

      const paramName = this.generateURLKey(filter.type, id);

      const serialized = this.serializeFilter(filter.type, filter.value);

      if (serialized) params.set(paramName, serialized);
    });

    this.navigate({ search: params.toString() }, { replace: true });
  }

  public read(): Filters {
    const params = new URLSearchParams(this.location.search);

    const result: Filters = {};

    Array.from(params.keys())
      .filter((key) => key.startsWith(this.prefix))
      .forEach((key) => {
        const [_, filterId, filterType] = key.split(this.separator);

        const type = filterType as FilterType;

        const valueStr = params.get(key);

        if (type && valueStr !== null) {
          result[filterId] = {
            type,
            value: this.deserializeFilter(type, valueStr),
            key: filterType,
          };
        }
      });

    return result;
  }

  public delete(type: FilterType, id: string): void {
    const params = new URLSearchParams(this.location.search);
    const paramName = this.generateURLKey(type, id);

    params.delete(paramName);

    this.navigate({ search: params.toString() }, { replace: true });
  }

  public clear(): void {
    const params = new URLSearchParams(this.location.search);

    Array.from(params.keys())
      .filter((key) => key.startsWith(this.prefix))
      .forEach((key) => params.delete(key));

    this.navigate({ search: params.toString() }, { replace: true });
  }
}
