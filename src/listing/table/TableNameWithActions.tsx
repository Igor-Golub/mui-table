import { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  listingName?: string;
  listingActions?: ReactNode;
}

export const TableNameWithActions = ({
  listingName,
  listingActions,
}: Props) => {
  return (
    <Box className="listingName">
      {listingName && (
        <Typography content="h6" variant="h6">
          {listingName}
        </Typography>
      )}

      {listingActions && listingActions}
    </Box>
  );
};
