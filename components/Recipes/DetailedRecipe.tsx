import {
  Checkbox,
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
import { Recipe as RecipeInterface, State } from "../../context/types";
import Chips from "./Chips";
import Recipe from "./Recipe";
import { useDetailedRecipeStyles } from "./style";
interface Props {
  recipe: RecipeInterface;
  id: number;
  handleSave: State["toggleSaveItem"];
  isSaved: boolean;
}

const maxWidth = 500;

const DetailedRecipe = ({ recipe, id, handleSave, isSaved }: Props) => {
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

  return (
    <Grid
      component={motion.div}
      className={classes.root}
      container
      drag="y"
      dragConstraints={{ top: -height + 400, bottom: 0 }}
      ref={ref}
    >
      <Grid
        component={motion.div}
        container
        item
        layoutId={`container ${recipe.uri}`}
        className={classes.mainGrid}
      >
        <Grid item xs={12}>
          <Recipe
            recipe={recipe}
            setSelected={() => { }}
            selected={true}
            active={true}
            id={id}
            handleSave={handleSave}
            isSaved={isSaved}
          />
        </Grid>
        <Grid item xs={12} className={classes.paperGrid}>
          <Paper
            //@ts-ignore
            component={motion.div}
            className={classes.paper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Chips data={healthLabels} color="secondary" />
            <Chips data={dietLabels} />
            <List className={classes.list}>
              {ingredientLines.map((ing, i) => (
                <span key={i}>
                  <Divider />
                  <ListItem>
                    <ListItemText primary={ing} />
                    <Checkbox />
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
              Instructions
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailedRecipe;
