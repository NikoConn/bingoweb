import { Button, Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";  // Usamos un ícono para el botón
import React, { useRef, useEffect } from "react";
import QRScanner from "qr-scanner";  // Importamos qr-scanner

function Scanner({ onScan, onBack }) {
  const videoRef = useRef(null);  // Referencia al elemento video donde se mostrará la cámara

  useEffect(() => {
    const qrScanner = new QRScanner(videoRef.current, (result) => {
      onScan(result);  // Llamamos a la función onScan cuando se escanea un código QR
    });

    qrScanner.start();  // Inicia el escáner de QR

    // Cleanup al desmontar el componente
    return () => {
      qrScanner.stop();  // Detiene el escáner cuando el componente se desmonta
    };
  }, [onScan]);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Botón de cancelar en la esquina superior izquierda con estilo mejorado */}
      <Button
        onClick={onBack}
        color="primary"
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 10, // Asegura que el botón esté encima del scanner
          backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Fondo oscuro semi-transparente
          color: 'white', // Texto blanco
          borderRadius: '50%', // Bordes redondeados
          padding: '12px', // Ajusta el padding para asegurar un tamaño adecuado
          boxShadow: 3, // Sombra ligera para darle profundidad
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Cambio de color al pasar el mouse
          },
        }}
      >
        {/* Aseguramos que el ícono tenga un tamaño adecuado */}
        <ArrowBack sx={{ fontSize: '2rem' }} />
      </Button>

      {/* Video donde se mostrará el escáner */}
      <Box sx={{ width: '100%', height: '100%' }}>
        <video ref={videoRef} style={{ width: '100%', height: '100%' }} />
      </Box>
    </Box>
  );
}

export default Scanner;
