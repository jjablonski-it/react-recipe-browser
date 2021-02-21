import { IconButton } from "@material-ui/core";
import { FilterList, Sort } from "@material-ui/icons";
import React from "react";

interface Props {}

const SortAndFilter = (props: Props) => {
  return (
    <>
      <IconButton>
        <FilterList />
      </IconButton>
      <IconButton>
        <Sort />
      </IconButton>
    </>
  );
};

export default SortAndFilter;
