import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
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

const App = (location) => {
  const [recipeDom, setRecipeDom] = useState({});

  return (
    <GlobalProvider>
      <Router>
        <Route
          path="/:id"
          render={(props) => <RecipeDetail {...props} recipeDom={recipeDom} />}
        />
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
