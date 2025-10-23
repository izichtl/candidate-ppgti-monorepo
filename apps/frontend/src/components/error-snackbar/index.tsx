import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface ErrorSnackbarProps {
  open: boolean;
  message: string | null;
  onClose: () => void;
  autoHideDuration?: number;
  severity?: "error" | "warning" | "info" | "success";
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({
  open,
  message,
  onClose,
  autoHideDuration = 6000,
  severity = "error",
}) => {
  if (!message) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity} onClose={onClose} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
