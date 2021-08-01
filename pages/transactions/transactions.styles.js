import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: "auto",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  divider: {
    width: "100%",
    height: "3px",
  },
  progress: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 300,
  },
}));

export { useStyles };
