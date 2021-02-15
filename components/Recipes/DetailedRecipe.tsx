import { Grid, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import { motion, useMotionValue, Variants } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Recipe as RecipeInterface } from "../../context/types";
import Recipe from "./Recipe";

const MotionGrid = motion.custom(Grid);
const MotionPaper = motion.custom(Paper);
interface Props {
  recipe: RecipeInterface;
  close: () => void;
}

const maxWidth = 500;

const DetailedRecipe = ({ recipe, close }: Props) => {
  if (!recipe) return <></>;

  return (
    <MotionGrid
      container
      style={{
        position: "fixed",
        top: 20,
        zIndex: 101,
        width: "auto",
        maxWidth: "90vw",
      }}
      drag="y"
      dragConstraints={{ left: 0, right: 0, top: -300, bottom: 0 }}
      // @ts-ignore
      onDrag={({ layerY }) => {
        if (layerY > 300 || layerY < -500) close();
      }}
    >
      <MotionGrid
        container
        item
        layoutId={`container ${recipe.uri}`}
        style={{ justifyContent: "center", maxWidth }}
      >
        <MotionGrid item xs={12}>
          <Recipe recipe={recipe} setSelected={() => {}} selected={true} />
        </MotionGrid>
        <Grid
          item
          xs={12}
          style={{
            maxWidth,
            minWidth: 200,
          }}
        >
          <MotionPaper
            style={{
              height: "100%",
              marginTop: -15,
              padding: "15px 0",
            }}
          >
            <List style={{ margin: 0 }}>
              {recipe.ingredientLines.map((ing) => (
                <ListItem>
                  <ListItemText primary={ing} />
                </ListItem>
              ))}
            </List>
          </MotionPaper>
        </Grid>
      </MotionGrid>
    </MotionGrid>
  );
};

export default DetailedRecipe;
