import React, { useEffect, useState } from "react";
import { NoSsr, Divider, Grid } from "@material-ui/core";
import { useStyles } from "./transactions.styles";
import BackForwardToolbar from "../../components/backforwardtoolbar/backforwardtoolbar.component";
import { useSnackbar } from "notistack";
import MainLayout from "../../layouts/main";
import dynamic from "next/dynamic";

const TransactionsTableContainer = dynamic(
  () =>
    import("../../containers/transactionstable/transactionstable.container"),
  { ssr: false }
);
const BalanceChartContainer = dynamic(
  () => import("../../containers/balancechart/balancechart.container"),
  { ssr: false }
);
const CategoryChartContainer = dynamic(
  () => import("../../containers/summarychart/summarychart.container"),
  { ssr: false }
);

export default function Transactions() {
  const classes = useStyles();
  const [monthString, setMonthString] = useState("");
  const [monthCounter, setMonthCounter] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  function handleChangeMonth(change) {
    let counter = monthCounter + change;
    if (counter < 1) {
      setMonthCounter(counter);
    }
  }

  function handleMonthString(change) {
    const today = new Date();
    const changedDate = new Date();
    changedDate.setMonth(today.getMonth() + change);
    if (changedDate.getFullYear() === today.getFullYear()) {
      return setMonthString(
        changedDate.toLocaleString("default", { month: "long" })
      );
    }
    return setMonthString(
      changedDate.toLocaleString("default", { month: "long" }) +
        " (" +
        changedDate.getFullYear() +
        ")"
    );
  }

  function handleError(error) {
    enqueueSnackbar(error.message, {
      variant: "error",
      persist: true,
    });
  }

  useEffect(() => handleMonthString(monthCounter), [monthCounter]);

  return (
    <MainLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid item xs={12} container>
            <BackForwardToolbar
              onBack={() => handleChangeMonth(-1)}
              onForward={() => handleChangeMonth(1)}
            >
              {monthString}
            </BackForwardToolbar>
            <Grid
              item
              xs={12}
              container
              justify="space-evenly"
              alignItems="center"
            >
              <NoSsr>
                <BalanceChartContainer
                  monthCounter={monthCounter}
                  onError={handleError}
                />
                <CategoryChartContainer
                  monthCounter={monthCounter}
                  onError={handleError}
                />
              </NoSsr>
            </Grid>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12}>
          <NoSsr>
            <TransactionsTableContainer
              monthCounter={monthCounter}
              onError={handleError}
            />
          </NoSsr>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
