import { TextField } from "@material-ui/core";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import Keywords from "./Keywords";

const SearchBar = () => {
  const [value, setValue] = useState("");
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
      <TextField
        value={value}
        label="Search"
        fullWidth
        color="secondary"
        onChange={(e) => {
          const value = e.target.value;
          if (value.slice(-1) === " ") {
            newKeyword(value);
          } else setValue(() => e.target.value);
        }}
      />
      <Keywords keywords={keywords} removeKeyword={removeKeyword!} />
    </form>
  );
};

export default SearchBar;
