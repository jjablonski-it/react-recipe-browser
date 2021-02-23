import { Chip, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { motion, Variants } from "framer-motion";
import React, { useContext } from "react";
import { Context } from "../../context/Context";

interface Props {
  keywords: string[];
  removeKeyword: (keyword: string) => void;
}

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const Keywords = ({ keywords, removeKeyword }: Props) => {
  const { excluded, addExclude, removeExclude, setKeywords } = useContext(
    Context
  );

  const isExcluded = (value: string) => excluded.includes(value);

  const handleToggle = (value: string) => {
    if (!isExcluded(value)) {
      addExclude!(value);
    } else {
      removeExclude!(value);
      removeKeyword(value);
    }
  };

  return (
    <>
      {keywords.length > 0 && (
        <IconButton
          style={{ float: "left", marginTop: 4 }}
          size="small"
          color="secondary"
          onClick={() => setKeywords!([])}
        >
          <Delete />
        </IconButton>
      )}
      <motion.div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {keywords.map((keyword, i) => (
          <Chip
            component={motion.div}
            layout
            key={i}
            label={keyword}
            style={{ margin: 5 }}
            color={isExcluded(keyword) ? "secondary" : "primary"}
            variants={variants}
            initial="hidden"
            animate="show"
            exit="hidden"
            onClick={() => handleToggle(keyword)}
          />
        ))}
      </motion.div>
    </>
  );
};

export default Keywords;
