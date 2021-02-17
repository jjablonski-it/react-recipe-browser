import { Grid, Typography } from "@material-ui/core";
import Recipes from "../components/Recipes";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <Grid container justify="center">
      <Typography variant="h1">RE🥐IPE</Typography>
      <SearchBar />
      <Recipes />
    </Grid>
  );
}
