import React, { useContext } from "react";
import { Context } from "../../context/Context";
import RecipeComp from "./Recipe";

const Recipes = () => {
  const { items } = useContext(Context);

  return items?.map((recipe) => <RecipeComp recipe={recipe} />);
};

export default Recipes;
