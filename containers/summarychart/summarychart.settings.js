export let defaultPieChartOptions = {
  chart: {
    background: "transparent",
  },
  legend: {
    show: true,
    position: "bottom",
    fontSize: "10px",
    fontWeight: 200,
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: "10px",
      fontWeight: 600,
    },
  },
  tooltip: {
    enabled: true,
    followCursor: true,
    style: {
      fontSize: "12px",
    },
    y: {
      show: true,
      formatter: function (val) {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      },
    },
  },
  labels: [],
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
