import { Grid, TextField } from "@material-ui/core";
import { AnimatePresence } from "framer-motion";
import React, { useRef, useState } from "react";
import { useCtx, useItemsCtx } from "../../context/Context";
import FilterOptions from "./FilterOptions";
import Keywords from "./Keywords";
import SortAndFilter from "./SortAndFilter";

const SearchBar = () => {
  const [value, setValue] = useState<string>("");
  const [showFilter, setShowFilter] = useState(false);

  const {
    addKeywords,
    removeKeyword,
    keywords,
  } = useCtx()

  const { getItems, clearItems } = useItemsCtx()

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Grid container>
      <Grid item xs={11}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            inputRef.current?.blur();
            clearItems!();
            getItems!([...keywords, value]);
            setValue("");
            addKeywords!([value]);
            setShowFilter(false);
          }}
          style={{ width: "100%" }}
        >
          <TextField
            value={value}
            label="Search"
            fullWidth
            color="secondary"
            onChange={(e) => {
              const { value } = e.target;
              if (value.slice(-1) === ",") {
                addKeywords!([value]);
                setValue("");
              } else setValue(() => value);
            }}
            inputRef={inputRef}
          />
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
