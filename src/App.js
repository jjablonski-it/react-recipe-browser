import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import { useTransition, animated } from "react-spring";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

import { GlobalProvider } from "./context/GlobalContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Components
import Search from "./components/Search";
import Recipes from "./components/Recipes";
import Keywords from "./components/Keywords";
import RecipeDetail from "./components/RecipeDetail";
import { positionDom, parentDom } from "./components/Dom";

const App = (location) => {
  const [recipeDom, setRecipeDom] = useState({});

  const recipeParentDom = parentDom(recipeDom, "card");

  const pos =
    Object.keys(recipeDom).length > 0 ? positionDom(recipeParentDom) : null;

  console.log(recipeDom);

  const transition = useTransition(recipeDom, null, {
    from: {
      opacity: 1,
      position: "absolute",
      transform: "translate(0%,0%)",
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
    },
    leave: {
      opacity: 0,
      position: "absolute",
      transform: "translate(0%,0%)",
      ...pos,
    },
    config: {
      duration: 500,
      native: true,
    },
  });

  return (
    <GlobalProvider>
      <Router>
        {transition.map(({ item, key, props }) => (
          <Route
            key={key}
            path="/:id"
            render={(routerProps) => (
              <RecipeDetail
                {...routerProps}
                transitionProps={props}
                recipeDom={item}
              />
            )}
          />
        ))}

        <Container>
          <h1 className="text-center">Recipe finder</h1>
          <Search />
          <Keywords />
          <Recipes setRecipeDom={setRecipeDom} />
        </Container>
      </Router>
    </GlobalProvider>
  );
};

export default withRouter(App);
