import { IconButton, Menu, MenuItem } from "@material-ui/core";
import {
  FilterList,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Sort,
} from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { Recipe, SortKey } from "../../context/types";

type OptionalRecipe = {
  [P in keyof Recipe]?: any;
};

const recipeSchema: OptionalRecipe = {
  totalTime: 0,
  calories: 0,
  yield: 0,
  label: 0,
  source: 0,
};

interface Props {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showFilter: boolean;
}

const SortAndFilter = ({ setShowFilter, showFilter }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortActive, setSortActive] = useState(false);
  const { sortItems, sortBy, sortAsc } = useContext(Context);

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setSortActive(!!sortBy);
  }, [sortBy]);

  return (
    <>
      <IconButton onClick={handleFilterClick}>
        <FilterList />
      </IconButton>
      <IconButton
        onClick={handleSortClick}
        color={sortActive ? "secondary" : "default"}
      >
        <Sort />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
        style={{ marginTop: 50 }}
      >
        {Object.keys(recipeSchema).map((key, i) => (
          <MenuItem onClick={() => sortItems!(key as SortKey)} key={i}>
            {key}
            {key === sortBy &&
              (sortAsc ? <KeyboardArrowUp /> : <KeyboardArrowDown />)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SortAndFilter;
