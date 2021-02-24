import {
  Container,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { Head } from "next/document";
import React from "react";
import ContextProvider from "../context/Context";
import "../styles/globals.css";

export const theme = createMuiTheme({
  palette: {
    primary: yellow,
    type: "dark",
    background: {
      default: "#242424",
      paper: "#353535",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <title>RE🥐IPE</title>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </ContextProvider>
  );
}

export default MyApp;
