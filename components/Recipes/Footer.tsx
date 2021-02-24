import { Box, CircularProgress, Typography } from "@material-ui/core";
import { FilterList, SortOutlined } from "@material-ui/icons";
import React, { ReactNode } from "react";

interface Props {
  loading: boolean;
  more: boolean;
  keywordsLen: number;
  itemsLen: number;
}

const B: React.FC<{}> = ({ children }) => (
  <Typography variant="h5" component="span" color="textPrimary">
    {" "}
    {children}
  </Typography>
);

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
      <Typography variant="h5" color="textSecondary" align="center">
        <p>
          Enter <B>comma</B> separated ingredients
        </p>
        <p>
          Click once to <B>exclude</B>, twice to <B>remove</B> keyword
        </p>
        <p>
          <B>
            <FilterList />
          </B>{" "}
          to <B>filter</B>
          <B>
            <SortOutlined />
          </B>{" "}
          to
          <B>sort</B>
        </p>
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
