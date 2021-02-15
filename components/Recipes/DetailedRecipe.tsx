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
  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   setLoaded(true);
  //   return () => {
  //     setLoaded(false);
  //   };
  // }, []);
  const containerY = useMotionValue(0);
  if (!recipe) return <></>;

  return (
    <MotionGrid
      container
      item
      style={{
        position: "fixed",
        top: 50,
        justifyContent: "center",
        zIndex: 101,
        width: "auto",
        y: containerY,
      }}
      layoutId={`container ${recipe.uri}`}
      layout
      drag
      dragDirectionLock
    >
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
            // marginLeft: -10,
            // paddingLeft: 10,
            // paddingBottom: 5,
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
  );
};

export default DetailedRecipe;
