import { Fab, makeStyles } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import React from "react";
import { useCtx, useItemsCtx } from "../context/Context";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
});

const Saved = () => {
  const { getSaved } = useCtx()
  const { clearItems } = useItemsCtx()
  const classes = useStyles();

  return (
    <Fab
      color="secondary"
      className={classes.root}
      onClick={() => {
        clearItems!();
        getSaved!();
      }}
    >
      <Favorite />
    </Fab>
  );
};

export default Saved;
