import { Filters, IFilterSync } from "../types.ts";

export class LSSync implements IFilterSync {
  constructor(
    private readonly key: string = "filters",
    private readonly initialValue: Filters = {},
  ) {
    localStorage.setItem(this.key, JSON.stringify(this.initialValue));
  }

  public write(value: Filters) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  public read() {
    const lsFilters = localStorage.getItem(this.key);

    if (!lsFilters) throw new Error("Filters not found");

    return JSON.parse(lsFilters) as Filters;
  }
}
