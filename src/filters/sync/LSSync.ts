import { FilterId, Filters, IFilterSync } from "../types.ts";

export class LSSync<Key extends string = string> implements IFilterSync<Key> {
  constructor(private readonly key: string = "filters") {}

  public write(value: Filters) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  public read() {
    return this.getFromLS();
  }

  public delete(id: FilterId) {
    const filters = this.getFromLS();
    const copy = { ...filters };
    delete copy[id];
    this.write(copy);
  }

  public clear() {
    this.write({});
  }

  private getFromLS() {
    const lsFilters = localStorage.getItem(this.key);

    if (!lsFilters) throw new Error("Filters not found");

    return JSON.parse(lsFilters) as Filters<Key>;
  }
}
