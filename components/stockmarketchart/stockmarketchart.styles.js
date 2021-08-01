import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  progress: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 300,
  },
  title: {
    display: "flex",
  },
  market: {
    display: "flex",
    flexDirection: "column",
  },
}));

export { useStyles };
