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
import { URLSync } from "./sync/URLSync.ts";
import { Logger } from "./logger.ts";
import { useLocation, useNavigate } from "react-router-dom";

interface FiltersOptions {
  initial?: Filters;
  logger: boolean;
  sync: FilterSync;
}

export function useCoreFilters(options: Partial<FiltersOptions> = {}) {
  const logger = useRef<Logger>(new Logger());
  const lsSync = useRef<LSSync>(new LSSync());

  const navigate = useNavigate();
  const location = useLocation();

  const urlSync = useRef<URLSync>(new URLSync(navigate, location));

  const settings = useRef<FiltersOptions>({
    sync: { storage: !!options.sync?.storage, url: !!options.sync?.url },
    logger: options.logger ?? false,
  });

  const [filters, setFilters] = useState<Filters>(
    settings.current.sync.url ? urlSync.current.read() : options.initial || {},
  );

  const onUpdateFilter = useCallback(
    <Type extends FilterType>(
      id: FilterId,
      updateDTO: Pick<FilterValue<Type>, "value" | "conditions">,
    ) => {
      setFilters((prev) => {
        const nextFilters = {
          ...prev,
          [id]: { ...prev[id], ...updateDTO },
        };

        if (settings.current.logger) {
          logger.current.log("onUpdateFilter action", nextFilters);
        }

        return nextFilters;
      });
    },
    [],
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
        if (settings.current.sync.url) urlSync.current.write(newFilters);

        if (settings.current.logger) {
          logger.current.log("onAddFilter action", newFilters);
        }

        return newFilters;
      });
    },
    [],
  );

  const onDeleteFilter = useCallback((filterId: FilterId) => {
    setFilters((prev) => {
      const current = { ...prev };

      const targetFilter = current[filterId];

      delete current[filterId];

      if (settings.current.sync.url) {
        urlSync.current.delete(filterId, targetFilter);
      }

      if (settings.current.sync.storage) lsSync.current.delete(filterId);

      if (settings.current.logger) {
        logger.current.log("onDeleteFilter action", current);
      }

      return current;
    });
  }, []);

  const onClearFilters = useCallback(() => {
    setFilters({});

    if (settings.current.sync.storage) lsSync.current.clear();
    if (settings.current.sync.url) urlSync.current.clear();

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
