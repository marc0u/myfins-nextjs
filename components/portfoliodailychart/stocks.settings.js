export let defaultLineChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    background: "transparent",
  },
  legend: {
    show: false,
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    type: "date",
    labels: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    labels: {
      formatter: function (val) {
        val = val / 1000000;
        return val > 0.1
          ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "M"
          : "";
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: function (val) {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      },
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
