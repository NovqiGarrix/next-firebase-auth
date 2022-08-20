import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import type { AppProps } from "next/app";
import AuthContextProvider from "../contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
