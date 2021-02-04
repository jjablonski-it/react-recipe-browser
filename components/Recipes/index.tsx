import React, { useContext } from "react";
import { Context } from "../../context/Context";
import RecipeComp from "./Recipe";

const Recipes = () => {
  const { items } = useContext(Context);

  return (
    <>
      {items?.map((recipe, i) => (
        <RecipeComp key={i} recipe={recipe} />
      ))}
    </>
  );
};

export default Recipes;
