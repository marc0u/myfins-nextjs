import axios from "axios";

class stocksAPI {
  constructor() {
    this.axios = axios.create({
      baseURL: `${process.env.REACT_APP_STOCKSAPI_HOST}/api/stocks/v2/`,
    });
  }
  pathStockPriceByDay(ticker) {
    return `cl/day/${ticker}`;
  }
  pathStockPriceByMin(ticker, interval = 1) {
    return `cl/min/${ticker}/${interval}`;
  }
  pathStockMarket(ticker) {
    return `cl/market/${ticker}`;
  }
  async fetchStockMarket(ticker) {
    const r = await this.axios.get(this.pathStockMarket(ticker));
    return r.data;
  }
  async fethMinutesStockSeries(ticker) {
    if (ticker === undefined || ticker === "") {
      throw new Error("Empty ticker");
    }
    let result = [
      {
        data: [
          // {
          //   x: new Date(1538778600000),
          //   y: [6629.81, 6650.5, 6623.04, 6633.33],
          // },
        ],
      },
    ];
    const r = await this.axios.get(this.pathStockPriceByMin(ticker));
    if (r.data === undefined || r.data.length === 0) {
      throw new Error("Not found");
    }
    r.data.forEach((e) => {
      result[0].data.push({
        x: e.Date.slice(0, 19) + "-00:00",
        y: [e.Open, e.High, e.Low, e.Close],
      });
    });
    return result;
  }
}

export default new stocksAPI();
