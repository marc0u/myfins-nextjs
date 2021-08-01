import React from "react";
import useStyles from "./stocks.styles";
import { Divider, Grid, Container } from "@material-ui/core";
import { useSnackbar } from "notistack";
import MainLayout from "../../layouts/main";
import dynamic from "next/dynamic";

const StocksTableContainer = dynamic(
  () => import("../../containers/stockstable/stockstable.container"),
  { ssr: false }
);
const SummaryCardsContainer = dynamic(
  () => import("../../containers/summarycards/summarycards.container"),
  { ssr: false }
);
const HoldingsChartContainer = dynamic(
  () => import("../../containers/holdingschart/holdingschart.container"),
  { ssr: false }
);
const PortfolioChartContainer = dynamic(
  () => import("../../containers/portfoliochart/portfoliochart.container"),
  { ssr: false }
);

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
