import { Grid, Typography } from "@material-ui/core";
import { useContext } from "react";
import Alert from "../components/Alert";
import Recipes from "../components/Recipes";
import Saved from "../components/Saved";
import SearchBar from "../components/SearchBar/";
import { Context } from "../context/Context";

export default function Home() {
  const { error, resetError } = useContext(Context);

  return (
    <Grid container justify="center">
      <Typography style={{ marginTop: 10, fontSize: "5rem" }}>
        RE🥐IPE
      </Typography>
      <SearchBar />
      <Saved />
      <Recipes />
      {!!error && <Alert handleClose={resetError!}>{error}</Alert>}
    </Grid>
  );
}
