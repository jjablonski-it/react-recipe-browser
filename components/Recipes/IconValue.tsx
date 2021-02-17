import { makeStyles } from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";
import { useIconValueStyles } from "./style";

interface Props {
  icon: JSX.Element;
  value: string | number;
  layoutId?: string;
}

const IconValue = ({ icon, value, layoutId }: Props) => {
  const classes = useIconValueStyles();

  return (
    <motion.span className={classes.root} layoutId={layoutId}>
      {icon} <span className={classes.value}>{value}</span>
    </motion.span>
  );
};

export default IconValue;
