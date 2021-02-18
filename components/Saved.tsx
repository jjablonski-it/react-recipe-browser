import { Button, Fab, makeStyles } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import React, { useContext } from "react";
import { Context } from "../context/Context";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
});

const Saved = () => {
  const { clearItems, getSaved } = useContext(Context);
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
