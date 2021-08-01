import React from "react";
import Chart from "react-apexcharts";

export default function HoldingsChart({ options, series }) {
  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      height="300"
      width="300"
    />
  );
}
