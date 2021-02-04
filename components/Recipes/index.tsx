import { Box, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { Context } from "../../context/Context";
import RecipeComp from "./Recipe";

const Recipes = () => {
  const { items } = useContext(Context);

  return (
    <Box marginTop={1}>
      <Grid container justify="space-around" spacing={1} alignItems="stretch">
        {items?.map((recipe, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <RecipeComp key={i} recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Recipes;
