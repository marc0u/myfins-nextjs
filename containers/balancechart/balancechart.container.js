import React, { useState, useEffect } from "react";
import { defaultBarChartOptions } from "./balancechartchart.settings";
import myfinsAPI from "../../requests/myfinsapi";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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
