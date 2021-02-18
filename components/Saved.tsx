import { Button, Fab, makeStyles } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import React, { useContext } from "react";
import { Context } from "../context/Context";

interface Props {}

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 50,
    right: 50,
  },
});

const Saved = (props: Props) => {
  const { clearItems } = useContext(Context);
  const classes = useStyles();

  return (
    <Fab
      color="secondary"
      className={classes.root}
      onClick={() => {
        clearItems!();
      }}
    >
      <Favorite />
    </Fab>
  );
};

export default Saved;
