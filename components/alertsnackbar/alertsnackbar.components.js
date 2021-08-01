import React from "react";
// Material UI
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default function AlertSnackbar({
  open,
  message,
  severity,
  autoHideDuration,
  onClose,
}) {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={severity}
        elevation={6}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
