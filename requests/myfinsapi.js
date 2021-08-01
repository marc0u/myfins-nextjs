import axios from "axios";
const isNode = typeof module !== "undefined";

class myfinsAPI {
  constructor() {
    this.axios = axios.create({
      baseURL: `${process.env.REACT_APP_MYFINSAPI_HOST}/api/myfins/v2`,
      headers: {
        Authorization: `Bearer ${!isNode && localStorage.getItem("sessionID")}`,
      },
    });
  }

  async login(token) {
    const data = new FormData();
    data.append("token", token);
    return await axios.post(
      `${process.env.REACT_APP_MYFINSAPI_HOST}/login`,
      data
    );
  }

  logout() {
    // return axios.get(`${process.env.REACT_APP_MYFINSAPI_HOST}/logout`);
    localStorage.clear();
    window.location.reload();
  }

  notify(name, email) {
    axios.get(`${process.env.REACT_APP_MYFINSAPI_HOST}/notify`, {
      params: {
        name: name,
        email: email,
      },
    });
  }

  dataFormatter(data) {
    data.amount = parseInt(data.amount);
    data.balance = parseInt(data.balance);
    return data;
  }

  // Handle Transactions
  async createTrans(data) {
    const res = this.axios.post(`/transactions`, this.dataFormatter(data));
    if (res.status === 401) {
      return this.logout();
    }
    return res;
  }

  async updateTransByID(id, data) {
    const res = this.axios.put(`/transactions/${id}`, this.dataFormatter(data));
    if (res.status === 401) {
      return this.logout();
    }
    return res;
  }

  async deleteTransByID(id) {
    const res = this.axios.delete(`/transactions/${id}`);
    if (res.status === 401) {
      return this.logout();
    }
    return res;
  }

  // Fetch Transactions
  async fetchTrans() {
    const res = this.axios.get(`/transactions`);
    if (res.status === 401) {
      return this.logout();
    }
    return res;
  }

  async fetchLastTrans() {
    const res = this.axios.get(`/transactions/last`);
    if (res.status === 401) {
      return this.logout();
    }
    return res;
  }

  async fetchTransByID(id) {
    const res = await this.axios.get(`/transactions/${id}`);
    if (res.status === 401) {
      return this.logout();
    }
    return res;
  }

  async fetchSummaryByMonth(change = "") {
    const res = await this.axios.get(`/transactions/summary`, {
      params: {
        change: change,
        exclusions: "between,transfers",
      },
    });
    if (res.status === 401) {
      return this.logout();
    }
    return res;
  }

  parseCategoriesTotalsAmount(items) {
    if (!items) {
      return [[], []];
    }
    let categories = [];
    let totals = [];
    items.forEach((item) => {
      if (item.category === "TRANSFERS") {
        return;
      }
      if (item.category === "SALARY") {
        return;
      }
      if (item.category === "BETWEEN") {
        return;
      }
      categories.push(item.category);
      totals.push(item.amount);
    });
    return [categories, totals];
  }

  parseIncomesExpencesTotals({ incomes, expenses }) {
    return [
      {
        name: "Incomes",
        data: [incomes],
      },
      {
        name: "Expenses",
        data: [expenses],
      },
    ];
  }
}

export default new myfinsAPI();
