import { Backdrop, Grid } from "@material-ui/core";
import { AnimateSharedLayout, motion, Variants } from "framer-motion";
import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { Recipe } from "../../context/types";
import DetailedRecipe from "./DetailedRecipe";
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
  const [selected, setSelected] = useState<Recipe | null>(null);

  return (
    <Grid
      container
      justify="space-around"
      spacing={1}
      style={{ marginTop: "10px" }}
    >
      <AnimateSharedLayout>
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
            whileHover={{
              scale: 0.95,
              transition: { type: "spring", stiffness: 500 },
            }}
            layoutId={recipe.uri}
          >
            <RecipeComp
              recipe={recipe}
              setSelected={() => setSelected(recipe)}
            />
          </MotionGrid>
        ))}

        <Backdrop
          open={!!selected}
          onClick={() => {
            setSelected(null);
          }}
          style={{ zIndex: 100 }}
        />
        <DetailedRecipe recipe={selected!} />
      </AnimateSharedLayout>
    </Grid>
  );
};

export default Recipes;
