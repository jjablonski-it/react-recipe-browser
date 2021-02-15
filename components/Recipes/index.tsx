import { Backdrop, Grid } from "@material-ui/core";
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  useDomEvent,
  Variants,
} from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
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
  const [show, setShow] = useState(false);
  // useDomEvent(useRef(window as any), "scroll", () => show && setShow(false));

  useEffect(() => {
    if (window) window.addEventListener("scroll", () => setShow(false));
    return () => {
      window.removeEventListener("scroll", () => setShow(false));
    };
  }, []);

  return (
    <Grid
      container
      justify="space-around"
      spacing={1}
      style={{ marginTop: "10px" }}
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
            // whileHover={{
            //   scale: 0.95,
            //   transition: { type: "spring", stiffness: 500 },
            // }}
            layoutId={`container ${recipe.uri}`}
            layout
          >
            <RecipeComp
              recipe={recipe}
              setSelected={() => {
                setSelected(recipe);
                setShow(true);
              }}
              selected={selected?.uri === recipe.uri}
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
          {show && <DetailedRecipe recipe={selected!} />}
        </AnimatePresence>
      </AnimateSharedLayout>
    </Grid>
  );
};

export default Recipes;
