import { Container, Grid, Typography } from "@material-ui/core";
import Recipes from "../components/Recipes";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <Container>
      <Grid container justify="center">
        <Typography variant="h1">Test</Typography>
        <SearchBar />
        <Recipes />
      </Grid>
    </Container>
  );
}
