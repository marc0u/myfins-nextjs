import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    width: 200,
  },
  input: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  inputProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function ({ placeholder, onClick, loading }) {
  const classes = useStyles();

  const handleClick = (event) => {
    if (event.key === "Enter") {
      onClick(event.target.value);
      event.target.value = "";
    }
  };

  return (
    <div className={classes.container}>
      <TextField
        className={classes.input}
        placeholder={placeholder}
        inputProps={{ "aria-label": placeholder }}
        onKeyPress={handleClick}
      />
      {loading && <CircularProgress size={24} />}
    </div>
  );
}
