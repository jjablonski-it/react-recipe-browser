import { Backdrop, Grid } from "@material-ui/core";
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  Variants
} from "framer-motion";
import React, { useEffect, useState } from "react";
import { useCtx, useItemsCtx } from "../../context/Context";
import { Recipe } from "../../context/types";
import DetailedRecipe from "./DetailedRecipe";
import Footer from "./Footer";
import RecipeComp from "./Recipe";

const item: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: ({ i, prevItemsCount }) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * (i - prevItemsCount) },
  }),
  exit: ({ i, itemsCount }) => ({
    opacity: 0,
    y: -20,
    transition: { delay: (itemsCount - i) * 0.04 },
  }),
};

const Recipes = () => {
  const {
    more,
    keywords,
    prevItemsCount,
    toggleSaveItem,
    saved,
    sortBy,
    sortAsc,
  } = useCtx()

  const {
    appendItems,
    items,
    loading
  } = useItemsCtx()

  const [selected, setSelected] = useState<Recipe | null>(null);
  const [show, setShow] = useState(false);

  const getRecipeId = (recipe: Recipe): number => {
    return items.indexOf(recipe);
  };

  const handleScroll = (_e: Event) => {
    setShow(false);
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight * 0.75 - 2
    )
      if (!loading && more) {
        appendItems!();
      }
  };

  const handleSort = (a: Recipe, b: Recipe): number => {
    if (!sortBy) return 1;
    let compare = a[sortBy] > b[sortBy];
    if (!sortAsc) compare = !compare;
    return compare ? 1 : -1;
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
          {[...items]?.sort(handleSort).map((recipe, i) => {
            const isSelected = !!selected && getRecipeId(selected) === i;
            const { uri } = recipe;
            const isSaved = saved.includes(uri);

            return (
              <Grid
                component={motion.div}
                key={uri}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                custom={{ i, prevItemsCount, itemsCount: items.length }}
                variants={item}
                initial="hidden"
                animate="show"
                // exit="exit"
                layoutId={`container ${uri}`}
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
              </Grid>
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
