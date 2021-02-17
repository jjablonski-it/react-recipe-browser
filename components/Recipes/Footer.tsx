import { Box, CircularProgress, Typography } from "@material-ui/core";
import React, { ReactNode } from "react";

interface Props {
  loading: boolean;
  more: boolean;
  keywordsLen: number;
  itemsLen: number;
}

const Footer = ({ loading, more, keywordsLen, itemsLen }: Props) => {
  let content: ReactNode;
  if (loading) {
    content = <CircularProgress />;
  } else if (!more) {
    content = (
      <Typography variant="h5" color="textSecondary">
        No {itemsLen > 0 && "more "}recipes
      </Typography>
    );
  } else if (itemsLen === 0 && keywordsLen === 0) {
    content = (
      <Typography variant="h5" color="textSecondary">
        Enter ingredients you want to use
      </Typography>
    );
  }

  return (
    <Box display="flex" mb={5}>
      {content}
    </Box>
  );
};

export default Footer;
