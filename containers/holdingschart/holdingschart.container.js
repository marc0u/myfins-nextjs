import React, { useEffect, useState } from "react";
import { defaultPieChartOptions } from "./holdingschart.settings";
import myStocksAPI from "../../requests/mystocksapi";
import HoldingsChart from "../../components/holdingschart/holdingschart.component";

export default function HoldingsChartContainer({ onError }) {
  const [chartPieOptions, setChartPieOptions] = useState(
    defaultPieChartOptions
  );
  const [chartPieSeries, setChartPieSeries] = useState([]);

  function fetchHoldings() {
    myStocksAPI
      .fetchHoldings()
      .then((res) => {
        const [categories, totals] = myStocksAPI.parseHoldingsPieChart(
          res.data
        );
        setChartPieOptions((prevState) => ({
          ...prevState,
          labels: categories,
        }));
        setChartPieSeries(totals);
      })
      .catch((error) => onError(error));
  }

  useEffect(() => {
    fetchHoldings();
  }, []);

  return <HoldingsChart options={chartPieOptions} series={chartPieSeries} />;
}
