import { Typography } from "@mui/material";

interface Props {
  entityRenderIndex: number;
}

export const Number = ({ entityRenderIndex }: Props) => {
  return (
    <Typography variant="body2" component="span">
      {entityRenderIndex + 1}
    </Typography>
  );
};
