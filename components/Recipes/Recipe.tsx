import React from "react";
import { Recipe as RecipeInterface } from "../../context/types";

interface Props {
  recipe: RecipeInterface;
}

const Recipe = ({ recipe }: Props) => {
  return <div>{recipe.label}</div>;
};

export default Recipe;
