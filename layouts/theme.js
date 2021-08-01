import React from "react";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import teal from "@material-ui/core/colors/teal";
import { SnackbarProvider } from "notistack";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: teal,
    secondary: teal,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const notistackRef = React.createRef();
const handleSnackClose = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

const Theme = ({ children }) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
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
        <div className={classes.root}>{children}</div>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Theme;
