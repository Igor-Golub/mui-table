import { Button } from "@mui/material";

interface Props {
  selectedRows: string[];
}

export const Selections = ({ selectedRows }: Props) => {
  return (
    <Button disabled={!selectedRows.length} variant="contained">
      Selections {selectedRows.length || ""}
    </Button>
  );
};
