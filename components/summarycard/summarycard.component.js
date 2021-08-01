import React from "react";
import { Card, Typography } from "@material-ui/core";
import useStyles from "./summarycard.styles";

export default function SymmaryCards({ title, children }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Typography>{title}</Typography>
      <Typography variant="h5" align="center">
        {children}
      </Typography>
    </Card>
  );
}
