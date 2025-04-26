import { useCallback, useRef, useState } from "react";
import { v4 } from "uuid";
import {
  Filter,
  FilterId,
  Filters,
  FilterSync,
  FilterType,
  FilterValue,
} from "./types.ts";
import { LSSync } from "./sync/LSSync.ts";
import { Logger } from "./logger.ts";

interface FiltersOptions {
  logger: boolean;
  sync: FilterSync;
}

export function useCoreFilters(options: Partial<FiltersOptions> = {}) {
  const logger = useRef<Logger>(new Logger());
  const lsSync = useRef<LSSync>(new LSSync());

  const settings = useRef<FiltersOptions>({
    sync: { storage: !!options.sync?.storage },
    logger: options.logger ?? false,
  });

  const [filters, setFilters] = useState<Filters>({});

  const findFilterByKey = useCallback(
    (key: string): { id: FilterId; filter: Filter } | null => {
      const result = Object.entries(filters).find(
        ([_, filter]) => filter?.key === key,
      );

      if (!result) return null;

      const [targetId, targetFilter] = result;

      return {
        id: targetId,
        filter: targetFilter,
      };
    },
    [filters],
  );

  const onUpdateFilter = useCallback(
    <Type extends FilterType>(
      id: FilterId,
      updateDTO: Pick<FilterValue<Type>, "value" | "conditions">,
    ) => {
      setFilters((prev) => {
        const filterDeps = prev[id]?.deps ?? [];

        const nextFilters = {
          ...prev,
          [id]: { ...prev[id], ...updateDTO },
        };

        filterDeps.forEach(({ action }) => {
          action(nextFilters, { findFilterByKey });
        });

        if (settings.current.logger) {
          logger.current.log("onUpdateFilter action", nextFilters);
        }

        return nextFilters;
      });
    },
    [findFilterByKey],
  );

  const onAddFilter = useCallback(
    <Type extends FilterType>(filter: Filter<Type>) => {
      setFilters((prev) => {
        const newFilterId = v4();

        const newFilters = {
          ...prev,
          [newFilterId]: { ...filter, value: filter?.value ?? null },
        };

        if (settings.current.sync.storage) lsSync.current.write(newFilters);

        if (settings.current.logger) {
          logger.current.log("onAddFilter action", newFilters);
        }

        return newFilters;
      });

      filter?.deps?.forEach(({ action }) => {
        action(filters, { findFilterByKey });

        if (settings.current.logger) {
          logger.current.log("onAddFilter deps call");
        }
      });
    },
    [filters, findFilterByKey],
  );

  const onDeleteFilter = useCallback((filterId: FilterId) => {
    setFilters((prev) => {
      const current = { ...prev };
      delete current[filterId];

      if (settings.current.logger) {
        logger.current.log("onDeleteFilter action", current);
      }

      return current;
    });
  }, []);

  const onClearFilters = useCallback(() => {
    setFilters({});

    if (settings.current.sync.storage) lsSync.current.write({});

    if (settings.current.logger) {
      logger.current.log("onClearFilters action");
    }
  }, []);

  return {
    filters,
    onAddFilter,
    onUpdateFilter,
    onDeleteFilter,
    onClearFilters,
  };
}
