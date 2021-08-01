import React, { useEffect, useState } from "react";
import SortedTable from "../../components/sortedtable/sortedtable.component";
import myfinsAPI from "../../requests/myfinsapi";
import { headCells } from "./transactionstable.settings";

export default function TransactionsTableContainer({ monthCounter, onError }) {
  const [trans, setTrans] = useState([]);

  function handleClickUpdate(data) {
    myfinsAPI
      .updateTransByID(data.id, data)
      .then((res) => console.log(res))
      .catch((error) => onError(error));
  }

  function handleClickCreate(data) {
    myfinsAPI
      .createTrans(data)
      .then((res) => console.log(res))
      .catch((error) => onError(error));
  }

  function handleClickDelete(ids) {
    ids.forEach((id) => {
      myfinsAPI
        .deleteTransByID(id)
        .then((res) => console.log(res))
        .catch((error) => onError(error));
    });
  }

  useEffect(() => {
    myfinsAPI
      .fetchSummaryByMonth(monthCounter)
      .then((res) => setTrans(res.data.transactions));
  }, [monthCounter]);

  return (
    <SortedTable
      rows={trans}
      headCells={headCells}
      onClickUpdate={handleClickUpdate}
      onClickCreate={handleClickCreate}
      onClickDelete={handleClickDelete}
    >
      Transactions
    </SortedTable>
  );
}
