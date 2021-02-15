import { TextField } from "@material-ui/core";
import React, { useContext } from "react";
import { Context } from "../context/Context";

interface Props {}

const SearchBar = (props: Props) => {
  const { getItems } = useContext(Context);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Submit");

        getItems("chocolate milk");
      }}
      style={{ width: "100%" }}
    >
      <TextField label="Search" fullWidth color="secondary" />
    </form>
  );
};

export default SearchBar;
