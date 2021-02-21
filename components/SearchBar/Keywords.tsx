import { Chip } from "@material-ui/core";
import { motion, Variants } from "framer-motion";
import React from "react";

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
  return (
    <>
      {keywords.map((keyword, i) => (
        <MotionChip
          key={i}
          label={keyword}
          style={{ margin: 5 }}
          layout
          color="primary"
          variants={variants}
          initial="hidden"
          animate="show"
          exit="hidden"
          onClick={() => removeKeyword(keyword)}
        />
      ))}
    </>
  );
};

export default Keywords;
