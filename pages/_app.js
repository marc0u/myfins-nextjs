import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/core/styles";
import { IconButton, CssBaseline } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { SnackbarProvider } from "notistack";
import theme from "../styles/materialui/theme";

const notistackRef = React.createRef();
const handleSnackClose = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

export default function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          preventDuplicate
          maxSnack={5}
          ref={notistackRef}
          action={(key) => (
            <IconButton
              aria-label="cancel"
              component="span"
              onClick={handleSnackClose(key)}
            >
              <Close />
            </IconButton>
          )}
        >
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
