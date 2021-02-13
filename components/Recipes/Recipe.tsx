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
  style?: React.CSSProperties;
}

export const useStyle = makeStyles<Theme, any>((theme) => ({
  root: {
    zIndex: ({ selected }) => (selected ? 1 : 0),
    height: 400,
    borderRadius: "3%",
    color: theme.palette.grey[50],
    width: "100%",
  },
  clickable: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
    margin: 0,
    top: 0,
  },
  image: {
    // position: "absolute",
    transform: "scale(1.4)",
  },
  overlay: {
    top: 0,
    left: 0,
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1,
    background: `linear-gradient(rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 87%, rgba(0,0,0,.6) 100%)`,
  },
  header: {
    width: 300,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 0,
    zIndex: 2,
    height: "100%",
  },
  secondary: {
    color: theme.palette.grey[200],
  },
  footer: {
    display: "flex",
    width: 300,
    alignSelf: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  },
}));

const Recipe = ({ recipe, setSelected, selected, style }: Props) => {
  const {
    label,
    source,
    yield: _yield,
    totalTime,
    calories,
    uri,
    image,
  } = recipe;
  const classes = useStyle({ selected });

  return (
    <MotionCard
      className={classes.root}
      elevation={3}
      layoutId={`card ${uri}`}
      style={style}
    >
      <CardActionArea className={classes.clickable} onClick={setSelected}>
        <div className={classes.overlay} />
        <img src={image} className={classes.image} />
        <div className={classes.content}>
          <CardHeader
            title={label}
            subheader={source}
            className={classes.header}
          />
          <CardContent className={classes.footer}>
            <IconValue icon={<Person />} value={_yield} />
            {!!totalTime && (
              <IconValue icon={<WatchLater />} value={totalTime} />
            )}
            <IconValue icon={<Whatshot />} value={Math.floor(calories)} />
          </CardContent>
        </div>
      </CardActionArea>
    </MotionCard>
  );
};

export default Recipe;
