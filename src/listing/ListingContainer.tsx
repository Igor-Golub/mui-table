import { PropsWithChildren } from "react";
import { Box } from "@mui/material";

export const ListingContainer = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        gap: "1rem",
        display: "flex",
        flexDirection: "column",

        "& .listingName": {
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        },
      }}
    >
      {children}
    </Box>
  );
};
