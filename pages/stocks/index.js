import React from "react";
import useStyles from "./stocks.styles";
import { Divider, Grid, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import StocksTableContainer from "../../containers/stockstable/stockstable.container";
import SummaryCardsContainer from "../../containers/summarycards/summarycards.container";
import HoldingsChartContainer from "../../containers/holdingschart/holdingschart.container";
import PortfolioChartContainer from "../../containers/portfoliochart/portfoliochart.container";
import MainLayout from "../../layouts/main";

export default function Stocks() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  function handleChange() {}

  function handleError(error) {
    enqueueSnackbar(error.message, {
      variant: "error",
      persist: true,
    });
  }
  return (
    <MainLayout>
      <Grid container spacing={3}>
        <Grid item xs={12} container justify="space-evenly" alignItems="center">
          <Grid item xs={12} sm={3}>
            <SummaryCardsContainer onError={handleError} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <PortfolioChartContainer onError={handleError} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <HoldingsChartContainer onError={handleError} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12}>
          <StocksTableContainer onChange={handleChange} onError={handleError} />
        </Grid>
      </Grid>
    </MainLayout>
  );
}
