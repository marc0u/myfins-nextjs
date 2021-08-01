export const chartOptions = {
  chart: {
    background: "transparent",
    animations: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  grid: {
    show: false,
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
  theme: {
    mode: "dark",
    palette: "palette1",
    monochrome: {
      enabled: false,
      color: "#255aee",
      shadeTo: "light",
      shadeIntensity: 0.65,
    },
  },
};
