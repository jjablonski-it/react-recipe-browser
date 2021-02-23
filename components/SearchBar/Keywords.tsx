import { Chip } from "@material-ui/core";
import { motion, Variants } from "framer-motion";
import React, { useContext } from "react";
import { Context } from "../../context/Context";

interface Props {
  keywords: string[];
  removeKeyword: (keyword: string) => void;
}

const MotionChip = motion.custom(Chip);

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

const Keywords = ({ keywords, removeKeyword }: Props) => {
  const { excluded, addExclude, removeExclude } = useContext(Context);

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
          color={isExcluded(keyword) ? "secondary" : "primary"}
          variants={variants}
          initial="hidden"
          animate="show"
          exit="hidden"
          onClick={() => handleToggle(keyword)}
        />
      ))}
    </motion.div>
  );
};

export default Keywords;
