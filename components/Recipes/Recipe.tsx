import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import {
  FavoriteBorderOutlined,
  Person,
  WatchLater,
  Whatshot,
} from "@material-ui/icons";
import { motion } from "framer-motion";
import React from "react";
import { Recipe as RecipeInterface } from "../../context/types";
import IconValue from "./IconValue";

const MotionCard = motion.custom(Card);
interface Props {
  recipe: RecipeInterface;
  setSelected: () => void;
  selected: boolean;
}

export const useStyle = makeStyles<
  Theme,
  RecipeInterface & { selected: boolean }
>((theme) => ({
  root: {
    zIndex: ({ selected }) => (selected ? 1 : 0),
    height: 400,
    borderRadius: "5%",
    color: theme.palette.grey[50],
    background: ({ image }) =>
      // `radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .3) 100%)`,
      `linear-gradient(rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 85%, rgba(0,0,0,.6) 100%), url(${image})`,
    backgroundSize: "cover!important",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  menu: {
    position: "absolute",
    bottom: 0,
  },
  clickable: {
    height: "100%",
    width: "100%",
    position: "absolute",
    margin: 0,
    top: 0,
  },
  header: {
    // alignSelf: "flex-start",
  },
  secondary: {
    color: theme.palette.grey[200],
  },
  footer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    marginTop: "auto",
  },
}));

const Recipe = ({ recipe, setSelected, selected }: Props) => {
  const { label, source, yield: _yield, totalTime, calories, uri } = recipe;
  const classes = useStyle({ ...recipe, selected });

  return (
    <MotionCard className={classes.root} elevation={3} layoutId={`card ${uri}`}>
      <CardActionArea className={classes.clickable} onClick={setSelected} />
      <CardHeader
        action={
          <IconButton
            className={classes.secondary}
            aria-label="add to favorites"
          >
            <FavoriteBorderOutlined />
          </IconButton>
        }
        title={label}
        subheader={<span className={classes.secondary}>{source}</span>}
        className={classes.header}
      />
      <CardContent className={classes.footer}>
        <IconValue icon={<Person />} value={_yield} />
        {!!totalTime && <IconValue icon={<WatchLater />} value={totalTime} />}
        <IconValue icon={<Whatshot />} value={Math.floor(calories)} />
      </CardContent>
    </MotionCard>
  );
};

export default Recipe;
