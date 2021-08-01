import React from "react";
import { Grid, IconButton, Typography } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

export default function BackForwardToolbar({ children, onBack, onForward }) {
  return (
    <Grid item xs={12} container justify="space-between" alignItems="center">
      <IconButton aria-label="Last" onClick={onBack}>
        <ArrowBackIos />
      </IconButton>
      <Typography variant="h6">{children}</Typography>
      <IconButton aria-label="Next" onClick={onForward}>
        <ArrowForwardIos />
      </IconButton>
    </Grid>
  );
}
