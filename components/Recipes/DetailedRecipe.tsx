import { motion } from "framer-motion";
import React from "react";
import { Recipe as RecipeInterface } from "../../context/types";
import Recipe from "./Recipe";

interface Props {
  recipe: RecipeInterface;
}

const DetailedRecipe = ({ recipe }: Props) => {
  if (!recipe) return <></>;

  return (
    <motion.div
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 101,
      }}
    >
      <Recipe recipe={recipe} setSelected={() => {}} selected={true} />
    </motion.div>
  );
};

export default DetailedRecipe;
