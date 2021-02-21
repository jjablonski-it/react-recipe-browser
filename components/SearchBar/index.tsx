import { Grid, IconButton } from "@material-ui/core";
import { FilterList, Sort } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import Input from "./Input";
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
      <Input newKeyword={newKeyword} setValue={setValue} value={value} />
      <Keywords keywords={keywords} removeKeyword={removeKeyword!} />
    </form>
  );
};

export default SearchBar;
