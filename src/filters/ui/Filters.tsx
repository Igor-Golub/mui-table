import { useCoreFilters } from "../useCoreFilters.ts";
import { FilterType } from "../types.ts";
import { Box, Button, Stack, Typography } from "@mui/material";

enum FilterKey {
  Quality = "quality",
  IsNewOnly = "isNewOnly",
}

export const UIFilters = () => {
  const { filters, onAddFilter, onClearFilters } = useCoreFilters<FilterKey>({
    sync: { storage: true, url: true },
    logger: true,
  });

  const renderByKey = {
    [FilterKey.Quality]: {
      label: "Car Quality",
    },
    [FilterKey.IsNewOnly]: {
      label: "Car IsNewOnly",
    },
  };

  return (
    <div>
      <Stack direction="row" gap="0.5rem">
        <Button
          variant="contained"
          onClick={() => {
            onAddFilter({
              key: FilterKey.Quality,
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
              key: FilterKey.IsNewOnly,
              type: FilterType.Boolean,
              value: true,
            });
          }}
        >
          Add
        </Button>

        <Button variant="outlined" color="error" onClick={onClearFilters}>
          Clear
        </Button>
      </Stack>

      <Box
        sx={{
          padding: "1rem",
          borderRadius: "1rem",
          boxShadow: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)",
        }}
      >
        {Object.entries(filters).map(([id, filter]) => (
          <Stack key={id} gap="1rem">
            <Stack direction="row" gap="0.5rem">
              <Typography>{renderByKey[filter.key].label}</Typography>

              <>Component</>
            </Stack>
          </Stack>
        ))}
      </Box>
    </div>
  );
};
