import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";

import { GlobalProvider } from "./context/GlobalContext";

// Components
import Search from "./components/Search";
import Recipes from "./components/Recipes";

function App() {
  return (
    <GlobalProvider>
      <Container>
        <h1>App</h1>
        <Search />
        <Recipes />
      </Container>
    </GlobalProvider>
  );
}

export default App;
