import axios from "axios";

class myStocksAPI {
  constructor() {
    this.axios = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_MYFINSAPI_HOST}/api/myfins/v2/`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionID")}`,
      },
    });
  }
  // Handle Stocks
  stocksFormatter(data) {
    data.stocks_amount = parseInt(data.stocks_amount);
    data.total_amount = parseFloat(data.total_amount);
    delete data.stock_price;
    delete data.balance;
    return data;
  }

  async createStock(data) {
    return await this.axios.post(`/stocks`, this.stocksFormatter(data));
  }

  async updateStockByID(id, data) {
    return await this.axios.put(`/stocks/${id}`, this.stocksFormatter(data));
  }

  async deleteStockByID(id) {
    return await this.axios.delete(`/stocks/${id}`);
  }

  // Fetch Stocks
  async fetchStocks() {
    return await this.axios.get(`/stocks`);
  }

  async fetchStockByID(id) {
    return await this.axios.get(`/stocks/${id}`);
  }

  async fetchHoldings() {
    return await this.axios.get(`/stocks/holdings`);
  }

  async fetchSummary() {
    return await this.axios.get(`/stocks/summary`);
  }

  async fetchPortfolioDaily() {
    return await this.axios.get(`/stocks/portfolio/daily`);
  }

  parseHoldingsPieChart(holdings) {
    if (!holdings) {
      return [[], []];
    }
    let categories = [];
    let totals = [];
    holdings.forEach((item) => {
      categories.push(item.ticker);
      totals.push(item.current_total_amount);
    });
    return [categories, totals];
  }

  parseTotalAssets(holdings) {
    return holdings.reduce((acc, obj) => acc + obj.current_total_amount, 0);
  }

  parseTotalInvested(rows) {
    const credit = rows
      .filter((row) => row.trans_type === "CREDIT")
      .reduce((acc, row) => acc + row.total_amount, 0);
    const withdrawal = rows
      .filter((row) => row.trans_type === "WITHDRAWAL")
      .reduce((acc, row) => acc + row.total_amount, 0);
    return credit - withdrawal;
  }

  parseCurrency(currency) {
    return currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  parsePortfolioDaily(portfolio) {
    // [
    //   {
    //     name: "STOCK ABC",
    //     data: [
    //       { x: "2020-01-28", y: 10 },
    //       { x: "2020-01-29", y: 5 },
    //       { x: "2020-01-30", y: 15 },
    //     ],
    //   },
    // ];
    let result = {
      name: "Portfolio",
      data: [],
    };
    if (!portfolio) {
      return result;
    }
    portfolio.forEach((item) => {
      result.data.push({ x: item.date, y: item.amount });
    });
    return [result];
  }
}

export default new myStocksAPI();
