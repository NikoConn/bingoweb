import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

function GameDialogs({ open, type, onClose, onContinue, onRestart }) {
  const { t } = useTranslation();

  const renderDialogContent = () => {
    switch (type) {
      case 'bingo':
        return (
          <>
            <DialogTitle>{t('bingo')}</DialogTitle>
            <DialogContent>
              <p>{t("congratulations has bingo")}</p>
              <p>{t("continue or start over")}</p>
            </DialogContent>
          </>
        );
      case 'row':
        return (
          <>
            <DialogTitle>{t("line completed")}</DialogTitle>
            <DialogContent>
              <p>{t("cardboard has line")}</p>
            </DialogContent>
          </>
        );
      case 'nothing':
        return (
          <>
            <DialogTitle>{t("no prizes card")}</DialogTitle>
            <DialogContent>
              <p>{t("no bingo nor line")}</p>
            </DialogContent>
          </>
        );
      default:
        return null;
    }
  };

  const handleClose = () => {
    onClose(); // Cierra el diálogo
  };

  const handleContinue = () => {
    onContinue(); // Llama a la función para continuar
    onClose(); // Cierra el diálogo
  };

  const handleRestart = () => {
    onRestart(); // Llama a la función para reiniciar el juego
    onClose(); // Cierra el diálogo
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      {renderDialogContent()}
      <DialogActions>
        {type === 'bingo' && (
          <Button onClick={handleRestart} color="secondary">
            {t("start over")}
          </Button>
        )}
        <Button onClick={handleContinue} color="primary">
          {t("continue")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GameDialogs;
