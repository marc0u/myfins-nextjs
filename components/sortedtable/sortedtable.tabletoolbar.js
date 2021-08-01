import React, { useState } from "react";
import clsx from "clsx";
// Material-UI
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
// Local
import { useToolbarStyles } from "./sortedtable.styles";
import FloatDialog from "../floatdialog/floatdialog.component";
import AlertDialog from "../alertdialog/alertdialog.component";

export default function SortedToolbar({
  itemSelected,
  headCells,
  rowsData,
  onClickUpdate,
  onClickCreate,
  onClickDelete,
  onClose,
  children,
}) {
  const numSelected = itemSelected.length;
  const data = rowsData.filter((trans) => trans.id == itemSelected[0])[0];
  const classes = useToolbarStyles();
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  let totalSelected = 0;
  if (numSelected > 0) {
    let totalArr = [];
    itemSelected.forEach((item) => {
      const r = rowsData.filter((row) => row.id === item);
      if (r[0].amount) {
        totalArr.push(r[0].amount);
      }
      if (r[0].total_amount) {
        totalArr.push(r[0].total_amount);
      }
    });
    totalSelected = totalArr.reduce((total, amount) => total + amount);
  }

  const handleClickUpdate = (data) => {
    setOpenUpdateDialog(false);
    onClickUpdate(data);
    onClose();
  };

  const handleClickCreate = (data) => {
    setOpenCreateDialog(false);
    onClickCreate(data);
    onClose();
  };

  const handleClickDelete = () => {
    onClickDelete(itemSelected);
    onClose();
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected. Total: {totalSelected.toLocaleString("es-CL")}
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {children}
        </Typography>
      )}

      {numSelected > 0 ? (
        <div style={{ display: "flex" }}>
          <Tooltip title="Edit item">
            <IconButton
              aria-label="edit item"
              onClick={() => setOpenUpdateDialog(true)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete item">
            <IconButton
              aria-label="delete item"
              onClick={() => setOpenConfirm(true)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          {openConfirm ? (
            <AlertDialog
              open={openConfirm}
              onClose={() => setOpenConfirm(false)}
              buttonLabel="Delete"
              buttonClick={handleClickDelete}
            >
              Do you want to Delete?
            </AlertDialog>
          ) : null}
          {openUpdateDialog ? (
            <FloatDialog
              open={openUpdateDialog}
              onClose={() => setOpenUpdateDialog(false)}
              object={data}
              fields={headCells}
              buttonLabel="Update"
              buttonClick={handleClickUpdate}
              confirm
            >
              Edit
            </FloatDialog>
          ) : null}
        </div>
      ) : (
        <>
          {/* <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip> */}
          <Tooltip title="Create item">
            <IconButton
              aria-label="create item"
              onClick={() => setOpenCreateDialog(true)}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          {openCreateDialog ? (
            <FloatDialog
              open={openCreateDialog}
              onClose={() => setOpenCreateDialog(false)}
              // object={rowsData[0]}
              fields={headCells}
              buttonLabel="Create"
              buttonClick={handleClickCreate}
            >
              Create
            </FloatDialog>
          ) : null}
        </>
      )}
    </Toolbar>
  );
}

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };
