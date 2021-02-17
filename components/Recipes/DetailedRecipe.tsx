import {
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@material-ui/core";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Recipe as RecipeInterface } from "../../context/types";
import Chips from "./Chips";
import Recipe from "./Recipe";
import { useDetailedRecipeStyles } from "./style";

const MotionGrid = motion.custom(Grid);
const MotionPaper = motion.custom(Paper);
interface Props {
  recipe: RecipeInterface;
  id: number;
}

const maxWidth = 500;

const DetailedRecipe = ({ recipe, id }: Props) => {
  const classes = useDetailedRecipeStyles({ maxWidth });
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  if (!recipe) return <></>;
  const { ingredientLines, healthLabels, dietLabels, url } = recipe;

  // FRAMER MOTION ISSUE WORK AROUND
  useEffect(() => {
    if (ref.current)
      setTimeout(() => setHeight(ref.current!.clientHeight), 400);
  }, []);

  console.log(height);

  return (
    <MotionGrid
      className={classes.root}
      container
      drag="y"
      dragConstraints={{ top: -height + 400, bottom: 0 }}
      ref={ref}
    >
      <MotionGrid
        container
        item
        layoutId={`container ${id}`}
        className={classes.mainGrid}
      >
        <MotionGrid item xs={12}>
          <Recipe
            recipe={recipe}
            setSelected={() => {}}
            selected={true}
            active={true}
            id={id}
          />
        </MotionGrid>
        <Grid item xs={12} className={classes.paperGrid}>
          <MotionPaper className={classes.paper}>
            <Chips data={healthLabels} color="secondary" />
            <Chips data={dietLabels} />
            <List className={classes.list}>
              {ingredientLines.map((ing, i) => (
                <span key={i}>
                  <Divider />
                  <ListItem>
                    <ListItemText primary={ing} />
                  </ListItem>
                </span>
              ))}
              <Divider />
            </List>
            <Link
              color="secondary"
              className={classes.link}
              href={url}
              variant={"h5"}
              target="_blank"
            >
              Source
            </Link>
          </MotionPaper>
        </Grid>
      </MotionGrid>
    </MotionGrid>
  );
};

export default DetailedRecipe;
