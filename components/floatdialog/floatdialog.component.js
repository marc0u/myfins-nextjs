import React, { useState } from "react";
// Material-UI
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
//Local
import { useStyles } from "./floatdialog.styles";
import AlertDialog from "../alertdialog/alertdialog.component";

export default function FloatDialog({
  open,
  onClose,
  children,
  contentText,
  object,
  fields,
  buttonLabel,
  buttonClick,
  confirm,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [data, setData] = useState(object ? object : objectDefault(fields));
  const [openConfirm, setOpenConfirm] = useState(false);

  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function objectDefault(fields) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let res = {};
    fields.forEach((e) => (res[e.id] = ""));
    res.date = today.toISOString().slice(0, 10);
    return res;
  }

  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{children}</DialogTitle>
      <DialogContent>
        {contentText ? (
          <DialogContentText>{contentText}</DialogContentText>
        ) : null}
        <form autoComplete="off">
          <Grid container spacing={3}>
            {fields.map((e) =>
              e.hiddenField ? null : (
                <Grid item xs={12} sm={6} key={e.id}>
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.imputField}
                  >
                    {e.inputType === "select" ? (
                      <>
                        <InputLabel id="demo-simple-select-outlined-label">
                          {e.label}
                        </InputLabel>
                        <Select
                          id={e.id}
                          key={e.id}
                          name={e.id}
                          value={data[e.id]}
                          defaultValue={
                            data[e.id] ? data[e.id] : e.defaultValue
                          }
                          onChange={handleChange}
                          label={e.label}
                        >
                          {e.menuItems.map((item) => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </>
                    ) : null}
                    {e.inputType === "field" ? (
                      <TextField
                        required
                        id={e.id}
                        key={e.id}
                        name={e.id}
                        label={e.label}
                        placeholder={e.defaultValue}
                        value={data[e.id]}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    ) : null}
                    {e.inputType === "date" ? (
                      <TextField
                        id={e.id}
                        key={e.id}
                        name={e.id}
                        label={e.label}
                        value={data[e.id].slice(0, 10)}
                        onChange={handleChange}
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                      />
                    ) : null}
                    {e.inputType === "currency" ? (
                      <>
                        <InputLabel htmlFor="outlined-adornment-amount">
                          {e.label}
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-amount"
                          key={e.id}
                          name={e.id}
                          label={e.label}
                          placeholder={e.defaultValue}
                          value={data[e.id]}
                          onChange={handleChange}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                        />
                      </>
                    ) : null}
                  </FormControl>
                </Grid>
              )
            )}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          autoFocus
          onClick={
            confirm ? () => setOpenConfirm(true) : () => buttonClick(data)
            // confirm ? () => setOpenConfirm(true) : () => console.log(data)
          }
        >
          {buttonLabel}
        </Button>
        <AlertDialog
          open={openConfirm}
          onClose={() => setOpenConfirm(false)}
          buttonLabel={buttonLabel}
          buttonClick={() => buttonClick(data)}
        >
          {`Do you really want to ${buttonLabel}?`}
        </AlertDialog>
      </DialogActions>
    </Dialog>
  );
}
