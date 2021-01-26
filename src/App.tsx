import { Container, Grid } from "@material-ui/core";
import SearchBar from "./components/SearchBar";

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
