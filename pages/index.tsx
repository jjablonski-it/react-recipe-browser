import {
  Container,
  createMuiTheme,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import Recipes from "../components/Recipes";
import SearchBar from "../components/SearchBar";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#242424",
      // paper: "#a1a1a1",
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Grid container justify="center">
          <Typography variant="h1">Test</Typography>
          <SearchBar />
          <Recipes />
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
