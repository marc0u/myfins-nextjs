const headCells = [
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "Date",
  },
  { id: "amount", numeric: true, disablePadding: false, label: "Amount" },
  {
    id: "detail_origin",
    numeric: false,
    disablePadding: false,
    label: "Detail",
  },
  { id: "account", numeric: false, disablePadding: false, label: "Account" },
  { id: "method", numeric: false, disablePadding: false, label: "Method" },
  { id: "category", numeric: false, disablePadding: false, label: "Category" },
];

const options = {
  formLabels: [{ id: "date" }],
};
