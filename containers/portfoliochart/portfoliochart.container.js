import React, { useEffect, useState } from "react";
import myStocksAPI from "../../requests/mystocksapi";
import PortfolioDailyChart from "../../components/portfoliodailychart/portfoliodailychart.component";

export default function PortfolioChartContainer({ onError }) {
  const [chartLineSeries, setChartLineSeries] = useState([]);

  useEffect(() => {
    myStocksAPI
      .fetchPortfolioDaily()
      .then((res) => {
        setChartLineSeries(myStocksAPI.parsePortfolioDaily(res.data));
      })
      .catch((error) => onError(error));
  }, []);

  return <PortfolioDailyChart series={chartLineSeries} />;
}
