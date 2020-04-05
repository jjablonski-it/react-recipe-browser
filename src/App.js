import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import { useTransition } from "react-spring";

import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

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

  useEffect(() => {
    setRecipeId(getIdFromUrl(pathname));
  }, [pathname]);

  const getIdFromUrl = (pathname) => {
    const id = parseInt(pathname.slice(1));
    return id;
  };

  const isNumber = (x) => {
    return typeof x === "number";
  };

  const recipeParentDom = parentDom(recipeDom, "card");

  const pos =
    Object.keys(recipeDom).length > 0 ? positionDom(recipeParentDom) : null;

  const transition = useTransition(recipeId, null, {
    from: {
      opacity: 1,
      position: "absolute",
      transform: "translate(0%,0%)",
      backgroundColor: "rgba(0,0,0,0)",
      ...pos,
    },
    enter: {
      position: "fixed",
      opacity: 1,
      width: window.innerWidth * 0.3,
      height: window.innerHeight * 0.3,
      left: window.innerWidth / 2,
      top: 25,
      transform: "translate(-50%, 0)",
      backgroundColor: "rgba(0,0,0,0.8)",
    },
    leave: {
      opacity: 0.8,
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0)",
      transform: "translate(0%,0%)",
      ...pos,
    },
    config: {
      duration: 150,
      //tension: 500,
    },
  });

  return (
    <GlobalProvider>
      {transition.map(
        ({ item, key, props }) =>
          console.log(item) ||
          ((item || item == 0) && (
            <RecipeDetail key={key} transitionProps={props} recipeId={item} />
          ))
      )}
      <Container>
        <h1 className="text-center">Recipe finder</h1>
        <Search />
        <Keywords />
        <Recipes setRecipeDom={setRecipeDom} />
      </Container>
    </GlobalProvider>
  );
};

export default withRouter(App);
