import { Backdrop, Grid } from "@material-ui/core";
import { AnimatePresence, AnimateSharedLayout, Variants } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { Recipe } from "../../context/types";
import { MotionGrid } from "../MotionElements";
import DetailedRecipe from "./DetailedRecipe";
import Footer from "./Footer";
import RecipeComp from "./Recipe";

const item: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i },
  }),
};

const Recipes = () => {
  const {
    items,
    getItems,
    loading,
    more,
    keywords,
    prevItemsCount,
    toggleSaveItem,
    saved,
  } = useContext(Context);
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
          {items?.map((recipe, i) => {
            const isSelected = !!selected && getRecipeId(selected) === i;
            const isSaved = saved.includes(recipe.uri);

            return (
              <MotionGrid
                key={i}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                custom={i - prevItemsCount}
                variants={item}
                initial="hidden"
                animate="show"
                layoutId={`container ${i}`}
                style={{ zIndex: isSelected ? 1 : 0 }}
              >
                <RecipeComp
                  recipe={recipe}
                  setSelected={() => {
                    setSelected(recipe);
                    setShow(true);
                  }}
                  handleSave={toggleSaveItem}
                  isSaved={isSaved}
                  id={i}
                  selected={isSelected}
                />
              </MotionGrid>
            );
          })}

          <Backdrop
            open={show}
            onClick={() => {
              setShow(false);
            }}
            style={{ zIndex: 100 }}
          />
          <AnimatePresence>
            {show && selected && (
              <DetailedRecipe
                recipe={selected}
                id={getRecipeId(selected)}
                handleSave={toggleSaveItem}
                isSaved={saved.includes(selected.uri)}
              />
            )}
          </AnimatePresence>
        </AnimateSharedLayout>
      </Grid>
      <Footer
        loading={loading}
        more={more}
        keywordsLen={keywords.length}
        itemsLen={items.length}
      />
    </>
  );
};

export default Recipes;
