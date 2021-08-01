export let defaultBarChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    background: "transparent",
  },
  colors: ["#00E396", "#FF4560"],
  legend: {
    show: false,
  },
  grid: {
    show: false,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "flat",
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: "10px",
      fontWeight: 600,
    },
    formatter: function (val) {
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    dropShadow: {
      enabled: true,
      top: 1,
      left: 1,
      blur: 1,
      color: "#000",
      opacity: 0.45,
    },
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["INCOMES", "EXPENSES"],
    labels: {
      style: {
        fontSize: "10px",
        fontWeight: 200,
      },
    },
  },
  yaxis: {
    show: false,
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    enabled: false,
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
