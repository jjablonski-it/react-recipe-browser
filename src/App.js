import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { GlobalProvider } from "./context/GlobalContext";

// Components
import Search from "./components/Search";
import Recipes from "./components/Recipes";
import Keywords from "./components/Keywords";
import RecipeDetail from "./components/RecipeDetail";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Container>
          <h1 className="text-center">Recipe finder</h1>
          <Search />
          <Keywords />
          <Switch>
            <Route path="/" component={Recipes} exact />
            <Route path="/:id" component={RecipeDetail} />
          </Switch>
        </Container>
      </Router>
    </GlobalProvider>
  );
}

export default App;
