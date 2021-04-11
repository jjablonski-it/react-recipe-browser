import { Grid, Typography } from "@material-ui/core";
import GithubCorner from "react-github-corner";
import Alert from "../components/Alert";
import Recipes from "../components/Recipes";
import Saved from "../components/Saved";
import SearchBar from "../components/SearchBar/";
import { useCtx } from "../context/Context";

export default function Home() {
  const { error, resetError } = useCtx()

  return (
    <Grid container justify="center">
      <Typography style={{ marginTop: 10, fontSize: "5rem" }}>
        RE🥐IPE
      </Typography>
      <SearchBar />
      <Saved />
      <Recipes />
      {!!error && <Alert handleClose={resetError!}>{error}</Alert>}
      <GithubCorner
        href="https://github.com/jjablonski-it/react-recipe-browser"
        size="70"
      />
    </Grid>
  );
}
