import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFiltersManagerContext } from "../contexts";
import {
  BaseTableEntity,
  FilterComponentsMapper,
  FiltersConfiguration,
  InputTypes,
} from "../types.ts";
import { useMemo } from "react";

interface Props<TableEntity extends BaseTableEntity> {
  configuration: FiltersConfiguration<TableEntity>[];
}

export const ListingFilters = <TableEntity extends BaseTableEntity>({
  configuration,
}: Props<TableEntity>) => {
  const { filtersValues, handleChangeFilters } = useFiltersManagerContext();

  const renderComponents: FilterComponentsMapper = useMemo(
    () => ({
      [InputTypes.Text]: (inputProps, filterValue) => (
        <TextField
          fullWidth
          size="small"
          placeholder="Enter value"
          value={filtersValues[filterValue] ?? ""}
          onChange={(event) => {
            handleChangeFilters(filterValue, event.target.value);
          }}
          {...inputProps}
        />
      ),
      [InputTypes.Select]: (inputProps, filterValue) => (
        <Select<string>
          fullWidth
          size="small"
          displayEmpty
          labelId="selectFilter"
          value={filtersValues[filterValue] ?? ""}
          onChange={(event) => {
            handleChangeFilters(filterValue, event.target.value);
          }}
          {...inputProps}
        >
          <MenuItem value="">
            <em>Not selected</em>
          </MenuItem>

          {inputProps.options.map(({ label, value }: any) => (
            <MenuItem key={label} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      ),
      [InputTypes.Checkbox]: (inputProps, filterValue) => (
        <FormControlLabel
          label={inputProps.label}
          control={
            <Checkbox
              size="small"
              checked={filtersValues[filterValue] ?? false}
              onChange={(_, checked) => {
                handleChangeFilters(filterValue, checked);
              }}
              {...inputProps}
            />
          }
        />
      ),
    }),
    [filtersValues],
  );

  return (
    <Stack>
      <Typography component="span" variant="subtitle1">
        Filters
      </Typography>

      <Stack direction="row" gap="1rem">
        {configuration.map(({ inputType, filterValue, inputProps }) => (
          <Box key={filterValue} sx={{ flex: 1 }}>
            {renderComponents[inputType](inputProps, filterValue)}
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};
