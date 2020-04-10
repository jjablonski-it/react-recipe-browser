import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import { useTransition } from "react-spring";

import { withRouter } from "react-router-dom";

import { GlobalProvider } from "./context/GlobalContext";

// Components
import Search from "./components/Search";
import Recipes from "./components/Recipes";
import Keywords from "./components/Keywords";
import RecipeDetail from "./components/RecipeDetail";
import { positionDom, parentDom } from "./components/Dom";

const App = ({ location: { pathname } }) => {
  const [recipeDom, setRecipeDom] = useState({});
  const [recipeId, setRecipeId] = useState(null);

  const getIdFromUrl = (pathname) => {
    const id = parseInt(pathname.slice(1));
    return id;
  };

  const recipeParentDom = parentDom(recipeDom, "card");

  const pos =
    Object.keys(recipeDom).length > 0 ? positionDom(recipeParentDom) : null;

  useEffect(() => {
    setRecipeId(getIdFromUrl(pathname));
  }, [pathname]);

  const transition = useTransition(recipeId, null, {
    from: {
      position: "absolute",
      transform: "translate(0%,0%)",
      backgroundColor: "rgba(0,0,0,0)",
      ...pos,
    },
    enter: {
      opacity: 1,
      position: "fixed",
      width:
        window.innerWidth > 800
          ? window.innerWidth * 0.4
          : window.innerWidth * 0.9,
      height:
        window.innerHeight > 800
          ? window.innerHeight * 0.4
          : window.innerHeight * 0.8,
      left: window.innerWidth / 2,
      top: 25,
      transform: "translate(-50%, 0)",
      backgroundColor: "rgba(0,0,0,0.8)",
    },
    leave: {
      opacity: 0,
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0)",
      transform: "translate(0%,0%)",
      ...pos,
    },
    config: {
      duration: 150,
    },
  });

  return (
    <GlobalProvider>
      {transition.map(
        ({ item, key, props }) =>
          (item || item === 0) && (
            <RecipeDetail
              key={key}
              transitionProps={props}
              recipeId={item}
              recipeDom={recipeParentDom}
            />
          )
      )}
      <Container>
        <h1 className="text-center">Recipe finder</h1>
        <Search />
        <Keywords />
        <Recipes setRecipeDom={setRecipeDom} recipeId={recipeId} />
      </Container>
    </GlobalProvider>
  );
};

export default withRouter(App);
