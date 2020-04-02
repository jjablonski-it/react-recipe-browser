import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import { GlobalProvider } from "./context/GlobalContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Components
import Search from "./components/Search";
import Recipes from "./components/Recipes";
import Keywords from "./components/Keywords";
import RecipeDetail from "./components/RecipeDetail";

const App = ({ location }) => {
  const animTimeout = { enter: 800, exit: 400 };
  const path = location.pathname;
  return (
    <GlobalProvider>
      <Router>
        <Container>
          <h1 className="text-center">Recipe finder</h1>
          <Search />
          <Keywords />
          <TransitionGroup>
            <CSSTransition
              timeout={animTimeout}
              classNames="page"
              unmountOnExit={true}
              mountOnEnter={true}
              key={path}
              in={true}
              appear={true}
            >
              <Switch>
                <Route path="/" component={Recipes} exact />
                <Route path="/:id" component={RecipeDetail} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </Container>
      </Router>
    </GlobalProvider>
  );
};

export default withRouter(App);
