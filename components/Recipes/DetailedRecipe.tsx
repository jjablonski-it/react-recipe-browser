import { Grid } from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";
import { Recipe as RecipeInterface } from "../../context/types";
import Recipe from "./Recipe";

const MotionGrid = motion.custom(Grid);

interface Props {
  recipe: RecipeInterface;
}

const DetailedRecipe = ({ recipe }: Props) => {
  if (!recipe) return <></>;

  return (
    <MotionGrid
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 101,
      }}
      item
      xs={12}
    >
      <Recipe
        recipe={recipe}
        setSelected={() => {}}
        selected={true}
        style={{ width: 500 }}
      />
    </MotionGrid>
  );
};

export default DetailedRecipe;
