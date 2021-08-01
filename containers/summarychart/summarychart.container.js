import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { defaultPieChartOptions } from "./summarychart.settings";
import myfinsAPI from "../../requests/myfinsapi";

export default function SummaryChartContainer({ monthCounter, onError }) {
  const [chartPieSeries, setChartPieSeries] = useState([]);
  const [chartPieOptions, setChartPieOptions] = useState(
    defaultPieChartOptions
  );

  useEffect(() => {
    myfinsAPI
      .fetchSummaryByMonth(monthCounter)
      .then((res) => {
        const [categories, amounts] = myfinsAPI.parseCategoriesTotalsAmount(
          res.data.categories
        );
        setChartPieOptions((prevState) => ({
          ...prevState,
          labels: categories,
        }));
        setChartPieSeries(amounts);
      })
      .catch((error) => onError(error));
  }, [monthCounter]);

  return (
    <div>
      <Chart
        options={chartPieOptions}
        series={chartPieSeries}
        type="donut"
        height="300"
        width="300"
      />
    </div>
  );
}
