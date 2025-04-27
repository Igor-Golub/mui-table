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

interface FiltersOptions<Key extends string = string> {
  initial?: Filters<Key>;
  logger: boolean;
  sync: FilterSync;
}

export function useCoreFilters<Key extends string = string>(
  options: Partial<FiltersOptions<Key>> = {},
) {
  const logger = useRef<Logger>(new Logger());

  const navigate = useNavigate();
  const location = useLocation();

  const urlSync = useRef<URLSync<Key>>(new URLSync(navigate, location));
  const lsSync = useRef<LSSync<Key>>(new LSSync());

  const settings = useRef<FiltersOptions<Key>>({
    sync: { storage: !!options.sync?.storage, url: !!options.sync?.url },
    logger: options.logger ?? false,
  });

  const [filters, setFilters] = useState<Filters<Key>>(() => {
    const initialState = settings.current.sync.url
      ? urlSync.current.read()
      : options.initial || {};

    lsSync.current.write(initialState);
    return initialState;
  });

  const onUpdateFilter = useCallback(
    <Type extends FilterType>(
      id: FilterId,
      updateDTO: Pick<FilterValue<Type>, "value" | "conditions">,
    ) => {
      setFilters((prev) => {
        const nextFilters: Filters<Key> = {
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
    <Type extends FilterType>(filter: Filter<Type, Key>) => {
      setFilters((prev) => {
        const newFilterId = v4();

        const newFilters: Filters<Key> = {
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
      const current: Filters<Key> = { ...prev };

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
