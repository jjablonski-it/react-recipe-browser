import { CardActionArea, CardContent } from "@material-ui/core";
import {
  FavoriteBorderOutlined,
  Person,
  WatchLater,
  Whatshot,
} from "@material-ui/icons";
import { motion } from "framer-motion";
import React from "react";
import { Recipe as RecipeInterface } from "../../context/types";
import {
  MotionCard,
  MotionCardHeader,
  MotionIconButton,
} from "../MotionElements";
import IconValue from "./IconValue";
import { useRecipeStyles } from "./style";

interface Props {
  recipe: RecipeInterface;
  setSelected: () => void;
  selected: boolean;
  style?: React.CSSProperties;
  active?: boolean;
  id: number;
}

const Recipe = ({
  recipe,
  setSelected,
  selected,
  style,
  active = false,
  id,
}: Props) => {
  const { label, source, yield: _yield, totalTime, calories, image } = recipe;
  const classes = useRecipeStyles({ selected });

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
