import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function GenerateCardboardsDialog({ open, onClose, onGenerate }) {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(4); // Estado para la cantidad de cartones

  const handleChange = (e) => {
    // Actualiza el estado con el valor del input
    setQuantity(e.target.value);
  };

  const handleSubmit = () => {
    // Llama a la función onGenerate para generar los cartones con la cantidad proporcionada
    const parsedQuantity = parseInt(quantity, 10);
    if (parsedQuantity > 0 && !isNaN(parsedQuantity)) {
      onGenerate(parsedQuantity); // Pasa la cantidad al componente principal
      setQuantity(""); // Resetea el input
      onClose(); // Cierra el diálogo
    } else {
      alert(t("valid number greater than 0"));
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("how many cards to generate")}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t("number of cards")}
          type="number"
          fullWidth
          variant="outlined"
          value={quantity}
          onChange={handleChange}
          slotProps={{
            htmlInput: {
              min: 1, // Asegura que el valor mínimo sea 1
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          {t("cancel")}
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {t("generate")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GenerateCardboardsDialog;
