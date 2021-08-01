import React, { useEffect, useState } from "react";
// Material UI
import { Typography, Grid, Container } from "@material-ui/core";
// Local
import { useStyles } from "./stockmarketchart.styles";
import { chartOptions } from "./stockmarketchart.setting";
import stocksAPI from "../../requests/stocksapi";
import { getVariation } from "../../utils/math.utils";

// Apex Charts
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ({ ticker, onError, onLoad }) {
  const classes = useStyles();
  const [series, setSeries] = useState([]);
  const [market, setMarket] = useState({});
  const [variation, setVariation] = useState();

  const fetchMarketData = () => {
    stocksAPI
      .fetchStockMarket(ticker)
      .then((data) => {
        setMarket(data);
      })
      .catch((error) => {
        onError(ticker, error);
      });
  };

  const fetchSeries = () => {
    stocksAPI
      .fethMinutesStockSeries(ticker)
      .then((data) => {
        setSeries(data);
        setVariation(
          getVariation(data[0].data[0].y[3], data[0].data.pop().y[3])
        );
        onLoad();
      })
      .catch((error) => {
        onError(ticker, error);
      });
  };

  useEffect(() => {
    const marketInterval = setInterval(fetchMarketData, 10 * 1000);
    const seriesInterval = setInterval(fetchSeries, 60 * 1000);
    fetchMarketData();
    fetchSeries();
    return () => {
      clearInterval(marketInterval);
      clearInterval(seriesInterval);
    };
  }, []);

  return (
    <Grid item xs={12} sm={6}>
      <Container className={classes.title}>
        <Typography>{ticker}</Typography>
        {market.buy && (
          <Container className={classes.market}>
            <Typography
              align="right"
              variant="caption"
            >{`${variation}%`}</Typography>
            <Typography
              align="right"
              variant="caption"
            >{`B:${market.buy} (${market.buy_vol}) S:${market.sell} (${market.sell_vol})`}</Typography>
          </Container>
        )}
      </Container>
      <Chart
        options={chartOptions}
        series={series}
        type="candlestick"
        height={250}
        width="100%"
      />
    </Grid>
  );
}
