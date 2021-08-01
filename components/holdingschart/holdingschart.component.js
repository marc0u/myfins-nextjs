import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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
