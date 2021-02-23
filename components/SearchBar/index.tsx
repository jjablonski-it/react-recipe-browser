import { Grid } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { MotionGrid } from "../MotionElements";
import FilterOptions from "./FilterOptions";
import Input from "./Input";
import Keywords from "./Keywords";
import SortAndFilter from "./SortAndFilter";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const {
    getItems,
    addKeyword,
    removeKeyword,
    keywords,
    clearItems,
  } = useContext(Context);

  const newKeyword = (value: string) => {
    value = value.trim();
    if (value) {
      addKeyword!(value.toLocaleLowerCase());
      setValue("");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        clearItems!();
        getItems!([...keywords, value]);
        newKeyword(value);
      }}
      style={{ width: "100%" }}
    >
      <Grid container>
        <Grid item xs={11}>
          <Input newKeyword={newKeyword} setValue={setValue} value={value} />
        </Grid>
        <Grid item style={{ marginTop: 5 }} xs={1}>
          <SortAndFilter
            setShowFilter={setShowFilter}
            showFilter={showFilter}
          />
        </Grid>
        <Grid item xs={12}>
          <Keywords keywords={keywords} removeKeyword={removeKeyword!} />
        </Grid>
        <Grid item xs={12} component={motion.div} layout>
          {showFilter && <FilterOptions />}
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchBar;
