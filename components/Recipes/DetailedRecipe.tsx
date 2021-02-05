import React from "react";
import { Recipe as RecipeInterface } from "../../context/types";
import Recipe from "./Recipe";

interface Props {
  recipe: RecipeInterface;
}

const DetailedRecipe = ({ recipe }: Props) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Recipe recipe={recipe} setSelected={() => {}} />
    </div>
  );
};

export default DetailedRecipe;
