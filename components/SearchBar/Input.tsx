import { TextField } from "@material-ui/core";
import React from "react";

interface Props {
  newKeyword: (keyword: string) => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({ value, newKeyword, setValue }: Props) => {
  return (
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
  );
};

export default Input;
