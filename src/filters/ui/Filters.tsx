import { useCoreFilters } from "../useCoreFilters.ts";
import { FilterType } from "../types.ts";
import { Button, Stack } from "@mui/material";

export const UIFilters = () => {
  const {
    filters,
    onAddFilter,
    onClearFilters,
    onDeleteFilter,
    onUpdateFilter,
  } = useCoreFilters({ sync: { storage: true }, logger: true });

  return (
    <div>
      <Stack direction="row" gap="0.5rem">
        <Button
          variant="contained"
          onClick={() => {
            onAddFilter({
              key: "quality",
              type: FilterType.String,
              value: "New",
            });
          }}
        >
          Add1
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            onAddFilter({
              key: "A",
              type: FilterType.Boolean,
              value: true,
              deps: [
                {
                  action: (_, { findFilterByKey }) => {
                    const qualityFilter = findFilterByKey("quality");
                    if (qualityFilter) {
                      onUpdateFilter<FilterType.String>(qualityFilter.id, {
                        value: "Used",
                      });
                    }
                  },
                },
              ],
            });
          }}
        >
          Add
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            if (Object.keys(filters).length) {
              onDeleteFilter(Object.keys(filters)[0]);
            }
          }}
        >
          Remove
        </Button>
        <Button variant="outlined" color="error" onClick={onClearFilters}>
          Clear
        </Button>
      </Stack>

      {JSON.stringify(filters)}
    </div>
  );
};
