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
    <Grid container>
      <Grid item xs={11}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            clearItems!();
            getItems!([...keywords, value]);
            newKeyword(value);
            setShowFilter(false);
          }}
          style={{ width: "100%" }}
        >
          <Input newKeyword={newKeyword} setValue={setValue} value={value} />
        </form>
      </Grid>
      <Grid item style={{ marginTop: 5 }} xs={1}>
        <SortAndFilter setShowFilter={setShowFilter} showFilter={showFilter} />
      </Grid>
      <Grid item xs={12}>
        <Keywords keywords={keywords} removeKeyword={removeKeyword!} />
      </Grid>
      <Grid item xs={12}>
        <AnimatePresence>{showFilter && <FilterOptions />}</AnimatePresence>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
