import { useEffect, useState } from "react";
import BingoGame from "../utils/BingoGame";
import { generatePDF, parseBarcode } from "../utils/CardboardGenerator";
import Board from "./components/Board";
import { Box, Button, Container, Typography } from "@mui/material";
import GenerateCardboardsDialog from "./components/GenerateCardboardsDialog";
import Scanner from "./components/Scanner";
import GameDialogs from "./components/GameDialogs";
import ConfirmRestartDialog from "./components/ConfirmRestartDialog";
import { useTranslation } from "react-i18next";

function Main() {
  const { t, i18n } = useTranslation();
  const [lastNumber, setLastNumber] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [showRestartDialog, setShowRestartDialog] = useState(false);
  const [showGenerateCardboardsDialog, setshowGenerateCardboardsDialog] =
    useState(false);
  const [game, setGame] = useState(() => {
    const savedGame = localStorage.getItem("bingoGame");
    if (savedGame) {
      return BingoGame.fromSerializable(JSON.parse(savedGame));
    } else {
      return new BingoGame();
    }
  });

  useEffect(() => {
    localStorage.setItem("bingoGame", JSON.stringify(game.toSerializable()));
    setLastNumber(game.getLastCalledNumber());
  }, [game]);

  function generateCardboards() {
    setshowGenerateCardboardsDialog(true);
  }

  function onGenerate(n_boards) {
    generatePDF(n_boards);
  }

  function callNumber() {
    let number = game.callNumber();

    let newGame = new BingoGame(game.maxNumber);
    newGame.calledNumbers = game.calledNumbers;
    newGame.calledNumbers.add(number);

    setGame(newGame);
  }

  function resetGame() {
    let newGame = new BingoGame(game.maxNumber);
    setGame(newGame);
    setShowRestartDialog(false);
  }

  function checkCardboard() {
    setShowCamera(true);
  }

  function onScan(result) {
    let cardboardNumbers = parseBarcode(result);
    const cardboard = [];
    while (cardboardNumbers.length)
      cardboard.push(cardboardNumbers.splice(0, 5));

    const hasRow = game.boardHasRow(cardboard);
    const hasBingo = game.boardHasBingo(cardboard);

    if (hasBingo) {
      setDialogType("bingo");
    } else if (hasRow) {
      setDialogType("row");
    } else {
      setDialogType("nothing");
    }
    setShowCamera(false);
  }

  function onCloseGameDialog() {
    setDialogType(null);
  }

  function onRestartGameDialog() {
    setDialogType(null);
    resetGame();
  }

  function onContinueGameDialog() {
    setDialogType(null);
  }

  const currentLanguage = i18n.language.split("-")[0];

  return (
    <div style={{ marginTop: "1.5em" }}>
      {showCamera ? (
        <div>
          <Scanner onScan={onScan} onBack={() => setShowCamera(false)} />
        </div>
      ) : (
        <div>
          <GenerateCardboardsDialog
            open={showGenerateCardboardsDialog}
            onGenerate={onGenerate}
            onClose={() => setshowGenerateCardboardsDialog(false)}
          />
          <GameDialogs
            open={dialogType !== null}
            type={dialogType}
            onClose={onCloseGameDialog}
            onRestart={onRestartGameDialog}
            onContinue={onContinueGameDialog}
          />
          <ConfirmRestartDialog
            open={showRestartDialog}
            onClose={() => setShowRestartDialog(false)}
            onConfirm={resetGame}
          />
          <Container>
            {/* Fila de botones */}
            <Box
              display="flex"
              justifyContent="space-between"
              marginBottom={2}
              gap={"10px"}
            >
              <Button variant="contained" onClick={generateCardboards}>
                {t("generate cardboards")}
              </Button>
              <Button
                variant="contained"
                onClick={() => setShowRestartDialog(true)}
              >
                {t("reset game")}
              </Button>
              <Button variant="contained" onClick={checkCardboard}>
                {t("check cardboard")}
              </Button>
            </Box>

            {/* Display de último número y botón para sacar otro */}
            <Box display="flex" justifyContent="center" marginBottom={2}>
              <Typography variant="h5" style={{ textAlign: "center" }}>
                {t("last number")}:{" "}
                {lastNumber && lastNumber !== "" ? lastNumber : "N/A"}
              </Typography>
              <Button
                variant="contained"
                onClick={callNumber}
                style={{ marginLeft: "20px" }}
                disabled={game.hasEnded()}
              >
                {t("call number")}
              </Button>
            </Box>

            <Board calledNumbers={game.calledNumbers} />
          </Container>
        </div>
      )}
      <div
        style={{
          color: "grey",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          position: "absolute",
          top: "0px",
          right: "5px",
        }}
      >
        <div
          style={{
            color: currentLanguage === "en" ? "black" : "gray",
            cursor: "pointer",
          }}
          onClick={() => i18n.changeLanguage("en")}
        >
          en
        </div>
        <div
          style={{
            color: currentLanguage === "es" ? "black" : "gray",
            cursor: "pointer",
          }}
          onClick={() => i18n.changeLanguage("es")}
        >
          es
        </div>
      </div>
    </div>
  );
}

export default Main;
