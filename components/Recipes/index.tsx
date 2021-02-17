import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { AnimatePresence, AnimateSharedLayout, Variants } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { Recipe } from "../../context/types";
import { MotionGrid } from "../MotionElements";
import DetailedRecipe from "./DetailedRecipe";
import RecipeComp from "./Recipe";

const item: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i },
  }),
};

const Recipes = () => {
  const { items, getItems, loading, more, keywords } = useContext(Context);
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [show, setShow] = useState(false);

  const getRecipeId = (recipe: Recipe): number => {
    return items.indexOf(recipe);
  };

  const handleScroll = (_e: Event) => {
    setShow(false);
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 2
    )
      if (!loading && more) {
        getItems!(keywords);
      }
  };

  useEffect(() => {
    if (window) window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [more, loading]);

  return (
    <>
      <Grid
        container
        justify="space-around"
        spacing={1}
        style={{ margin: "10px 0 50px 0" }}
      >
        <AnimateSharedLayout type="crossfade">
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
              layoutId={`container ${i}`}
            >
              <RecipeComp
                recipe={recipe}
                setSelected={() => {
                  setSelected(recipe);
                  setShow(true);
                }}
                id={i}
                selected={!!selected && getRecipeId(selected) === i}
              />
            </MotionGrid>
          ))}

          <Backdrop
            open={show}
            onClick={() => {
              setShow(false);
            }}
            style={{ zIndex: 100 }}
          />
          <AnimatePresence>
            {show && selected && (
              <DetailedRecipe recipe={selected} id={getRecipeId(selected)} />
            )}
          </AnimatePresence>
        </AnimateSharedLayout>
      </Grid>
      <Box display="flex" mb={10}>
        {loading && <CircularProgress />}
        {!loading && !more && (
          <Typography variant="h5" color="textSecondary">
            No {items.length > 0 && "more "}recipes
          </Typography>
        )}
      </Box>
    </>
  );
};

export default Recipes;
