import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
  },
  imputField: {
    // margin: theme.spacing(1),
    width: "100%",
    // [theme.breakpoints.down("sm")]: {
    //   width: "100%",
    // },
  },
}));

export { useStyles };
