import React from "react";
import { defaultLineChartOptions } from "./stocks.settings";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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
