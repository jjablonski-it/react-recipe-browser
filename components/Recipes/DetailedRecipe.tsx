import { Grid, Paper } from "@material-ui/core";
import { motion, useMotionValue, Variants } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Recipe as RecipeInterface } from "../../context/types";
import Recipe from "./Recipe";

const MotionGrid = motion.custom(Grid);
const MotionPaper = motion.custom(Paper);
interface Props {
  recipe: RecipeInterface;
}

const maxWidth = 500;

const DetailedRecipe = ({ recipe }: Props) => {
  if (!recipe) return <></>;

  return (
    <MotionGrid
      container
      style={{
        position: "fixed",
        top: 50,
        justifyContent: "center",
        zIndex: 101,
        width: "auto",
      }}
      drag
      dragDirectionLock
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    >
      <MotionGrid container item layoutId={`container ${recipe.uri}`}>
        <MotionGrid item xs style={{ maxWidth, width: "95vw" }}>
          <Recipe
            recipe={recipe}
            setSelected={() => {}}
            selected={true}
            style={{ height: "100%" }}
          />
        </MotionGrid>
        <Grid item xs={12} sm style={{ maxWidth, minWidth: 200 }}>
          <MotionPaper
            style={{
              height: "100%",
            }}
          >
            <ul style={{ margin: 0 }}>
              {recipe.ingredientLines.map((ing) => (
                <li>{ing}</li>
              ))}
            </ul>
          </MotionPaper>
        </Grid>
      </MotionGrid>
    </MotionGrid>
  );
};

export default DetailedRecipe;
