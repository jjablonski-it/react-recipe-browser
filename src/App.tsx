import { Container, Grid } from "@material-ui/core";
import { useContext } from "react";
import SearchBar from "./components/SearchBar";
import { Context } from "./context/Context";

function App() {
  return (
    <Container>
      <Grid container>
        <SearchBar />
      </Grid>
    </Container>
  );
}

export default App;
