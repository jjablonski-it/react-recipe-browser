import { Chip } from "@material-ui/core";
import React, { ReactElement } from "react";
import { useChipsStyles } from "./style";

interface Props {
  data: string[];
  color?: "primary" | "secondary" | "default";
}

function Chips({ data, color }: Props): ReactElement {
  const classes = useChipsStyles();

  return (
    <div className={classes.root}>
      {data.map((lbl, i) => (
        <Chip
          key={i}
          label={lbl}
          color={color || "default"}
          className={classes.item}
        />
      ))}
    </div>
  );
}

export default Chips;
