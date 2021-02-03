import { TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { Context } from "../context/Context";

interface Props {}

const SearchBar = (props: Props) => {
  const { getItems } = useContext(Context);

  return (
    <form
      onSubmit={() => {
        getItems();
      }}
      style={{ width: "100%" }}
    >
      <TextField label="Search" fullWidth />
    </form>
  );
};

export default SearchBar;
