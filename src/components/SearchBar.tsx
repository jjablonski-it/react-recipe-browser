import { TextField } from "@material-ui/core";
import React, { ReactElement } from "react";

interface Props {}

function SearchBar({}: Props): ReactElement {
  return <TextField label="Search" fullWidth />;
}

export default SearchBar;
