import { Container, Grid, Typography } from "@material-ui/core";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <Container>
      <Grid container justify="center">
        <Typography variant="h1">Test</Typography>
        <SearchBar />
      </Grid>
    </Container>
  );
}
