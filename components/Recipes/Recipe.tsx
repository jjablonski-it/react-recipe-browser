import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import {
  Favorite,
  FavoriteBorderOutlined,
  Person,
  WatchLater,
  Whatshot,
} from "@material-ui/icons";
import { motion } from "framer-motion";
import React, { useCallback } from "react";
import { Recipe as RecipeInterface, State } from "../../context/types";
import IconValue from "./IconValue";
import { useRecipeStyles } from "./style";

const MotionIconButton = motion.custom(IconButton);
interface Props {
  recipe: RecipeInterface;
  setSelected: () => void;
  selected: boolean;
  style?: React.CSSProperties;
  active?: boolean;
  handleSave: State["toggleSaveItem"];
  isSaved: boolean;
  id: number;
}

function Recipe({
  setSelected, recipe, ...props }: Props & { setSelected: (recipe: RecipeInterface) => void }) {
  const setSelectedMemoized = useCallback(() => setSelected(recipe), [recipe])

  return <RecipeImpl {...props} recipe={recipe} setSelected={setSelectedMemoized} />
}

function RecipeImpl({
  recipe,
  setSelected,
  selected,
  style,
  active = false,
  isSaved,
  handleSave,
}: Props) {
  const {
    label,
    source,
    yield: _yield,
    totalTime,
    calories,
    image,
    uri,
  } = recipe;
  const classes = useRecipeStyles({ selected });

  return (
    <Card
      //@ts-ignore
      component={motion.div}
      className={classes.root}
      elevation={3}
      layoutId={`card ${uri}`}
      style={style}
    >
      <CardActionArea
        className={classes.clickable}
        onClick={setSelected}
        disabled={active}
      >
        <div className={classes.overlay} />
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={image}
          className={classes.image}
          layoutId={`image ${uri}`}
        />
        <div className={classes.content}>
          <CardHeader
            component={motion.div}
            title={label}
            subheader={source}
            className={classes.header}
            layoutId={`header ${uri}`}
          />
          <CardContent className={classes.footer}>
            <IconValue
              icon={<Person />}
              value={_yield}
              layoutId={`person_icon ${uri}`}
            />
            {!!totalTime && (
              <IconValue
                icon={<WatchLater />}
                value={totalTime}
                layoutId={`time_icon ${uri}`}
              />
            )}
            <IconValue
              icon={<Whatshot />}
              value={Math.floor(calories)}
              layoutId={`calories_icon ${uri}`}
            />
          </CardContent>
        </div>
      </CardActionArea>
      <MotionIconButton
        className={classes.fab}
        layoutId={`icon ${uri}`}
        onClick={() => handleSave!(uri)}
      >
        {isSaved ? (
          <Favorite className={classes.secondary} />
        ) : (
          <FavoriteBorderOutlined className={classes.secondary} />
        )}
      </MotionIconButton>
    </Card>
  );
};

//@ts-ignore
RecipeImpl = React.memo(RecipeImpl)

export default Recipe;
