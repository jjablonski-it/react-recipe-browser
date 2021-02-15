import { Chip, TextField } from "@material-ui/core";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { Context } from "../context/Context";

const MotionChip = motion.custom(Chip);

const SearchBar = () => {
  const [value, setValue] = useState("");
  const { getItems, addKeyword, keywords } = useContext(Context);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
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
            addKeyword!(value.trim());
            setValue("");
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
        {keywords.map((keyword) => (
          <MotionChip
            label={keyword}
            style={{ margin: 5 }}
            layout
            color="primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        ))}
      </motion.div>
    </form>
  );
};

export default SearchBar;
