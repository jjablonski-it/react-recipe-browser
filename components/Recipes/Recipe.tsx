import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Fab,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import {
  Favorite,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  Person,
  WatchLater,
  Whatshot,
} from "@material-ui/icons";
import { motion } from "framer-motion";
import React from "react";
import { Recipe as RecipeInterface } from "../../context/types";
import IconValue from "./IconValue";

const MotionCard = motion.custom(Card);
const MotionCardHeader = motion.custom(CardHeader);
const MotionIconButton = motion.custom(IconButton);
interface Props {
  recipe: RecipeInterface;
  setSelected: () => void;
  selected: boolean;
  style?: React.CSSProperties;
  active?: boolean;
  id: number;
}

export const useStyle = makeStyles<Theme, any>((theme) => ({
  root: {
    zIndex: ({ selected }) => (selected ? 1 : 0),
    height: 400,
    borderRadius: "3%",
    color: theme.palette.grey[50],
    width: "100%",
    position: "relative",
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
    width: 500,
  },
  overlay: {
    top: 0,
    left: 0,
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1,
    background: `linear-gradient(rgba(0,0,0,.6) 0%, rgba(0,0,0,0) 70%, rgba(0,0,0,0) 87%, rgba(0,0,0,.6) 100%)`,
  },
  header: {
    width: 260,
    padding: "inherit",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    position: "absolute",
    top: 0,
    zIndex: 2,
    height: "100%",
    width: "100%",
    padding: 4,
  },
  secondary: {
    color: theme.palette.grey[200],
  },
  footer: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    marginTop: "auto",
    padding: "inherit",
    paddingBottom: "4px!important",
  },
  fab: {
    position: "absolute",
    right: 1,
    top: 5,
    zIndex: 2,
  },
}));

const Recipe = ({
  recipe,
  setSelected,
  selected,
  style,
  active = false,
  id,
}: Props) => {
  const { label, source, yield: _yield, totalTime, calories, image } = recipe;
  const classes = useStyle({ selected });

  return (
    <MotionCard
      className={classes.root}
      elevation={3}
      layoutId={`card ${id}`}
      style={style}
    >
      <CardActionArea
        className={classes.clickable}
        onClick={setSelected}
        disabled={active}
      >
        <div className={classes.overlay} />
        <motion.img
          src={image}
          className={classes.image}
          layoutId={`image ${id}`}
        />
        <div className={classes.content}>
          <MotionCardHeader
            title={label}
            subheader={source}
            className={classes.header}
            layoutId={`header ${id}`}
          />
          <CardContent className={classes.footer}>
            <IconValue
              icon={<Person />}
              value={_yield}
              layoutId={`person_icon ${id}`}
            />
            {!!totalTime && (
              <IconValue
                icon={<WatchLater />}
                value={totalTime}
                layoutId={`time_icon ${id}`}
              />
            )}
            <IconValue
              icon={<Whatshot />}
              value={Math.floor(calories)}
              layoutId={`calories_icon ${id}`}
            />
          </CardContent>
        </div>
      </CardActionArea>
      <MotionIconButton className={classes.fab} layoutId={`icon ${id}`}>
        <FavoriteBorderOutlined className={classes.secondary} />
      </MotionIconButton>
    </MotionCard>
  );
};

export default Recipe;
