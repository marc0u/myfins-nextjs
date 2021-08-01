import React, { useEffect, useState } from "react";
import myStocksAPI from "../../requests/mystocksapi";
import SummaryCard from "../../components/summarycard/summarycard.component";
import { parseCurrency, objectKeyAsTitle } from "../../utils/table.utils";

export default function SummaryCardsContainer({ onError }) {
  const [summary, setSummary] = useState({
    total_assets: "0",
    total_invested: "0",
    total_gained: "0",
  });

  function fetchSummary() {
    myStocksAPI
      .fetchSummary()
      .then((res) =>
        setSummary({
          total_assets: res.data.total_assets,
          total_invested: res.data.total_invested,
          total_gained: res.data.total_gained,
        })
      )
      .catch((error) => onError(error));
  }

  useEffect(() => {
    fetchSummary();
  }, []);

  return Object.keys(summary).map((key, index) => (
    <SummaryCard key={key} title={objectKeyAsTitle(key)}>
      {parseCurrency(summary[key])}
    </SummaryCard>
  ));
}
