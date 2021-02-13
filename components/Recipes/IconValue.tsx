import { motion } from "framer-motion";
import React from "react";

interface Props {
  icon: JSX.Element;
  value: string | number;
  layoutId?: string;
}

const IconValue = ({ icon, value, layoutId }: Props) => {
  return (
    <motion.span
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: 20,
      }}
      layoutId={layoutId}
    >
      {icon}
      {value}
    </motion.span>
  );
};

export default IconValue;
