import { Filter, FilterId, Filters } from "./types.ts";

class UtilsManager {
  public findFilterByKey(
    filters: Filters,
    key: string,
  ): { id: FilterId; filter: Filter } | null {
    const result = Object.entries(filters).find(
      ([_, filter]) => filter?.key === key,
    );

    if (!result) return null;

    const [targetId, targetFilter] = result;

    return {
      id: targetId,
      filter: targetFilter,
    };
  }
}

export const utils = new UtilsManager();
