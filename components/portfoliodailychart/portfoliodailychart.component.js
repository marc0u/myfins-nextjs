import React from "react";
import Chart from "react-apexcharts";
import { defaultLineChartOptions } from "./stocks.settings";

export default function PortfolioDailyChart({ series }) {
  return (
    <Chart
      options={defaultLineChartOptions}
      series={series}
      type="area"
      height="300"
      width="100%"
    />
  );
}
