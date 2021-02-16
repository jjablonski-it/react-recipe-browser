import { Chip, TextField } from "@material-ui/core";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { Context } from "../context/Context";

const MotionChip = motion.custom(Chip);

const SearchBar = () => {
  const [value, setValue] = useState("");
  const { getItems, addKeyword, removeKeyword, keywords } = useContext(Context);

  const newKeyword = (value: string) => {
    value = value.trim();
    if (value) addKeyword!(value.toLocaleLowerCase());
    setValue("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        newKeyword(value);
        getItems!();
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
          if (value[value.length - 1] === " ") {
            newKeyword(value);
          } else setValue(() => e.target.value);
        }}
      />
      <motion.div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {keywords.map((keyword, i) => (
          <MotionChip
            key={i}
            label={keyword}
            style={{ margin: 5 }}
            layout
            color="primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => removeKeyword!(keyword)}
          />
        ))}
      </motion.div>
    </form>
  );
};

export default SearchBar;
