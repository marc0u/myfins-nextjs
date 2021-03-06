export const headCells = [
  {
    id: "date",
    inputType: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
    defaultValue: "2020-12-31",
    hiddenHead: false,
    hiddenField: false,
  },
  {
    id: "type",
    inputType: "select",
    menuItems: ["INCOME", "EXPENSE"],
    numeric: false,
    disablePadding: false,
    label: "Type",
    defaultValue: "EXPENSE",
    hiddenHead: true,
    hiddenField: false,
  },
  {
    id: "amount",
    inputType: "currency",
    numeric: true,
    disablePadding: false,
    label: "Amount",
    defaultValue: "1000",
    hiddenHead: false,
    hiddenField: false,
  },
  {
    id: "category",
    inputType: "field",
    numeric: false,
    disablePadding: false,
    label: "Category",
    defaultValue: "RESTAURANTS",
    hiddenHead: false,
    hiddenField: false,
  },
  {
    id: "detail_origin",
    inputType: "field",
    numeric: false,
    disablePadding: false,
    label: "Detail Origin",
    defaultValue: "REDCOMPRA SUSHI",
    hiddenHead: true,
    hiddenField: false,
  },
  {
    id: "detail_custom",
    inputType: "field",
    numeric: false,
    disablePadding: false,
    label: "Detail",
    defaultValue: "Sushi Friends",
    hiddenHead: false,
    hiddenField: false,
  },
  {
    id: "account",
    inputType: "select",
    menuItems: ["DAILY", "SAVING", "CASH"],
    numeric: false,
    disablePadding: false,
    label: "Account",
    defaultValue: "DAILY",
    hiddenHead: false,
    hiddenField: false,
  },
  {
    id: "method",
    inputType: "select",
    menuItems: ["DEBIT", "CREDIT", "CASH"],
    numeric: false,
    disablePadding: false,
    label: "Method",
    defaultValue: "DEBIT",
    hiddenHead: false,
    hiddenField: false,
  },
  {
    id: "bank",
    inputType: "select",
    menuItems: ["SCOTIABANK", "FALABELLA", "SANTANDER", "CONSORCIO", "CASH"],
    numeric: false,
    disablePadding: false,
    label: "Bank",
    defaultValue: "SCOTIABANK",
    hiddenHead: false,
    hiddenField: false,
  },
  {
    id: "made_by",
    inputType: "select",
    menuItems: ["MARCO", "AIARA"],
    numeric: false,
    disablePadding: false,
    label: "Made By",
    defaultValue: "MARCO",
    hiddenHead: true,
    hiddenField: false,
  },
];
