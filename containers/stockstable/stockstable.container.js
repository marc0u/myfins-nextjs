import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import SortedTable from "../../components/sortedtable/sortedtable.component";
import { headCells } from "./stockstable.settings";
import useStyles from "./stockstable.styles";
import myStocksAPI from "../../requests/mystocksapi";

export default function StocksTableContainer({ onChange, onError }) {
  const classes = useStyles();
  const [stocks, setStocks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  function fetchStocks() {
    myStocksAPI
      .fetchStocks()
      .then((res) => {
        setStocks(res.data);
        setLoaded(true);
        sessionStorage.setItem(
          "total_invested",
          myStocksAPI.parseTotalInvested(res.data)
        );
      })
      .catch((error) => onError(error));
  }

  function handleClickUpdate(data) {
    myStocksAPI
      .updateStockByID(data.id, data)
      .then((res) => onChange())
      .catch((error) => onError(error));
  }

  function handleClickCreate(data) {
    myStocksAPI
      .createStock(data)
      .then((res) => onChange())
      .catch((error) => onError(error));
  }

  function handleClickDelete(ids) {
    ids.forEach((id) => {
      myStocksAPI
        .deleteStockByID(id)
        .then((res) => onChange())
        .catch((error) => onError(error));
    });
  }

  useEffect(() => fetchStocks(), []);

  return loaded ? (
    <SortedTable
      rows={stocks}
      headCells={headCells}
      onClickUpdate={handleClickUpdate}
      onClickCreate={handleClickCreate}
      onClickDelete={handleClickDelete}
    >
      Stocks
    </SortedTable>
  ) : (
    <div className={classes.progress}>
      <CircularProgress />
    </div>
  );
}
