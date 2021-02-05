import { Box, Grid } from "@material-ui/core";
import { motion, Variants } from "framer-motion";
import React, { useContext } from "react";
import { Context } from "../../context/Context";
import RecipeComp from "./Recipe";

const MotionGrid = motion.custom(Grid);

const item: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i },
  }),
};

const Recipes = () => {
  const { items } = useContext(Context);

  return (
    <Grid
      container
      justify="space-around"
      spacing={1}
      style={{ marginTop: "10px" }}
    >
      {items?.map((recipe, i) => (
        <MotionGrid
          key={i}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          custom={i}
          variants={item}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 0.95 }}
        >
          <RecipeComp recipe={recipe} />
        </MotionGrid>
      ))}
    </Grid>
  );
};

export default Recipes;
