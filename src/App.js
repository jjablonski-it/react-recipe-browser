import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { GlobalProvider } from "./context/GlobalContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Components
import Search from "./components/Search";
import Recipes from "./components/Recipes";
import Keywords from "./components/Keywords";
import RecipeDetail from "./components/RecipeDetail";

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <Container>
          <h1 className="text-center">Recipe finder</h1>
          <Search />
          <Keywords />
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  timeout={500}
                  key={location.key}
                  classNames="page"
                  unmountOnExit={true}
                >
                  <Switch location={location}>
                    <Route path="/" component={Recipes} exact />
                    <Route path="/:id" component={RecipeDetail} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </Container>
      </Router>
    </GlobalProvider>
  );
};

export default App;
