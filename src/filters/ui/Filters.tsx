import { useCoreFilters } from "../useCoreFilters.ts";
import { FilterType } from "../types.ts";
import { Button, Stack } from "@mui/material";

export const UIFilters = () => {
  const { filters, onAddFilter, onClearFilters, onDeleteFilter } =
    useCoreFilters({ sync: { storage: true, url: true }, logger: true });

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
              key: "isNewOnly",
              type: FilterType.Boolean,
              value: true,
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
