import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";

import { GlobalProvider } from "./context/GlobalContext";

// Components
import Search from "./components/Search";
import Recipes from "./components/Recipes";
import { Keywords } from "./components/Keywords";

function App() {
  return (
    <GlobalProvider>
      <Container>
        <h1 className="text-center">Recipe finder</h1>
        <Search />
        <Keywords />
        <Recipes />
      </Container>
    </GlobalProvider>
  );
}

export default App;
