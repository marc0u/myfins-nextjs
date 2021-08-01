import React, { useEffect, useState } from "react";
import { Container, Divider, Grid } from "@material-ui/core";
import { useStyles } from "./transactions.styles";
import TransactionsTableContainer from "../../containers/transactionstable/transactionstable.container";
import BalanceChartContainer from "../../containers/balancechart/balancechart.container";
import CategoryChartContainer from "../../containers/summarychart/summarychart.container";
import BackForwardToolbar from "../../components/backforwardtoolbar/backforwardtoolbar.component";
import { useSnackbar } from "notistack";
import MainLayout from "../../layouts/main";

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
              <BalanceChartContainer
                monthCounter={monthCounter}
                onError={handleError}
              />
              <CategoryChartContainer
                monthCounter={monthCounter}
                onError={handleError}
              />
            </Grid>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12}>
          <TransactionsTableContainer
            monthCounter={monthCounter}
            onError={handleError}
          />
        </Grid>
      </Grid>
    </MainLayout>
  );
}
