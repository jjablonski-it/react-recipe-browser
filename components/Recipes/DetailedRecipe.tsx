import { Grid } from "@material-ui/core";
import { motion, Variants } from "framer-motion";
import React from "react";
import { Recipe as RecipeInterface } from "../../context/types";
import Recipe from "./Recipe";

const MotionGrid = motion.custom(Grid);

const variants: Variants = {
  hidden: { opacity: 0, x: "-100%" },
  show: { opacity: 1, x: 0, transition: { delay: 0.03, duration: 0.5 } },
};
interface Props {
  recipe: RecipeInterface;
}

const DetailedRecipe = ({ recipe }: Props) => {
  if (!recipe) return <></>;

  return (
    <MotionGrid
      style={{
        position: "fixed",
        zIndex: 101,
        display: "flex",
        alignItems: "center",
      }}
      item
      xs={12}
      sm={9}
    >
      <Recipe
        recipe={recipe}
        setSelected={() => {}}
        selected={true}
        style={{
          height: 500,
          width: "100%",
          maxWidth: 500,
          borderRadius: "3% 0 0 3%",
        }}
      />
      <motion.div
        // layout
        style={{
          borderRadius: "0 3% 3% 0",
          background: `rgba(0,0,0,.6)`,
          height: 500,
          paddingRight: 20,
        }}
        variants={variants}
        initial="hidden"
        animate="show"
        exit="hidden"
        transition={{ duration: 0.1 }}
      >
        <ul>
          {recipe.ingredientLines.map((ing) => (
            <li>{ing}</li>
          ))}
        </ul>
      </motion.div>
    </MotionGrid>
  );
};

export default DetailedRecipe;
