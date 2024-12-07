import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function ConfirmRestartDialog({ open, onClose, onConfirm }) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("restart confirmation")}</DialogTitle>
      <DialogContent>
        <p>{t("restart confirmation 2")}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          {t("cancel")}
        </Button>
        <Button onClick={onConfirm} color="primary">
        {t("reset")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmRestartDialog;
