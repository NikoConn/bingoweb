import React from "react";
import { Grid2 as Grid, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function Board({ calledNumbers, maxNumber = 90 }) {
  const { t } = useTranslation();
  // Generamos los números del 1 al maxNumber
  const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);

  // Estilo de la cuadrícula para hacerla responsiva
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(9, 1fr)", // 9 columnas para representar los números
    gap: "4px", // Reducimos el espacio entre los números
    width: "100%",
    height: "100%",
    justifyItems: "center",
    alignItems: "center",
    gridAutoRows: "minmax(40px, auto)", // Altura mínima de las filas
    overflowX: "hidden", // Evita el desbordamiento horizontal
    // Estilos responsivos
    "@media (max-width: 600px)": {
      gridTemplateColumns: "repeat(6, 1fr)", // En pantallas pequeñas, reducimos a 6 columnas
      gap: "2px", // Reducimos aún más el espacio entre celdas
    },
    "@media (max-width: 400px)": {
      gridTemplateColumns: "repeat(5, 1fr)", // En pantallas muy pequeñas, reducimos a 5 columnas
      gap: "1px", // Espacio aún más pequeño
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "16px" }}>
        {t("called numbers")}:
      </Typography>
      <Box sx={{ overflowY: "auto", flex: 1, width: "100%" }}>
        <Grid container spacing={2} sx={gridStyle}>
          {numbers.map((num) => (
            <Grid item key={num}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "30px", // Ajustamos el tamaño de las celdas para pantallas pequeñas
                  height: "30px", // Ajustamos el tamaño de las celdas
                  backgroundColor: calledNumbers.has(num)
                    ? "green"
                    : "lightgray",
                  color: calledNumbers.has(num) ? "white" : "black",
                  borderRadius: "50%",
                  fontWeight: "bold",
                  fontSize: "1em", // Tamaño de texto ajustado para pantallas pequeñas
                  transition: "background-color 0.3s",
                }}
              >
                {num}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Board;
