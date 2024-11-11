import { Button } from "@mui/material";

interface Props {
  onReset: VoidFunction;
}

export const Filters = ({ onReset }: Props) => {
  return (
    <Button variant="contained" onClick={onReset}>
      Reset Filters
    </Button>
  );
};
