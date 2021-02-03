import { AppProps } from "next/dist/next-server/lib/router/router";
import ContextProvider from "../context/Context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
