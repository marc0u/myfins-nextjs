import React, { useState } from "react";
import { Grid, Container, Chip } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useStyles } from "./stocks-market.styles";
import StockMarketChart from "../../components/stockmarketchart/stockmarketchart.component";
import AddItemInput from "../../components/additeminput/additeminput.component";
import MainLayout from "../../layouts/main";

export default function () {
  const classes = useStyles();
  const [tickers, setTickers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const addTicker = (ticker) => {
    setLoading(true);
    setTickers((prevState) => [...prevState, ticker.toUpperCase()]);
  };

  const removeTicker = (tickerToDelete) => {
    setTickers((prevState) =>
      prevState.filter((ticker) => ticker !== tickerToDelete)
    );
  };

  const handleError = (ticker, error) => {
    setLoading(false);
    removeTicker(ticker);
    enqueueSnackbar(error.message, {
      variant: "error",
      persist: true,
    });
  };

  return (
    <MainLayout>
      <AddItemInput
        placeholder="Add ticker"
        onClick={addTicker}
        onDelete={removeTicker}
        loading={loading}
        items={tickers}
      />
      {tickers.map((data) => (
        <Chip
          key={data}
          label={data}
          onDelete={() => removeTicker(data)}
          className={classes.chip}
        />
      ))}
      <Grid container spacing={3}>
        {tickers.map((ticker) => (
          <StockMarketChart
            ticker={ticker}
            key={ticker}
            onError={handleError}
            onLoad={() => setLoading(false)}
          />
        ))}
      </Grid>
    </MainLayout>
  );
}
