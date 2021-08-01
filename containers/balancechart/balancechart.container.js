import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { defaultBarChartOptions } from "./balancechartchart.settings";
import myfinsAPI from "../../requests/myfinsapi";

export default function BalanceChartContainer({ monthCounter, onError }) {
  const [chartBarSeries, setChartBarSeries] = useState([]);

  useEffect(() => {
    myfinsAPI
      .fetchSummaryByMonth(monthCounter)
      .then((res) =>
        setChartBarSeries(myfinsAPI.parseIncomesExpencesTotals(res.data))
      )
      .catch((error) => onError(error));
  }, [monthCounter]);

  return (
    <div>
      <Chart
        options={defaultBarChartOptions}
        series={chartBarSeries}
        type="bar"
        height="300"
        width="300"
      />
    </div>
  );
}
