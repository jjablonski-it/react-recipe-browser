import { Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { Context } from "../../context/Context";
import RecipeComp from "./Recipe";

const Recipes = () => {
  const { items } = useContext(Context);

  return (
    <Grid container justify="space-around" spacing={1} alignItems="stretch">
      {items?.map((recipe, i) => (
        <Grid item xs={3}>
          <RecipeComp key={i} recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Recipes;
