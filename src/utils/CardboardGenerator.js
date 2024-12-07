import JsBarcode from "jsbarcode";
import { jsPDF } from "jspdf";

function generateRandomNumbers(min, max, num) {
  const numbers = [];
  while (numbers.length < num) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }

  numbers.sort((a, b) => a - b);

  return numbers;
}

function generateBoard(rows = 3, columns = 9) {
  let board = Array(rows)
    .fill()
    .map(() => Array(columns).fill(""));

  for (let column = 0; column < columns; column++) {
    board[column] = generateRandomNumbers(
      column * 10 + 1,
      column * 10 + 10,
      rows
    );
  }

  const toRemovePerRow = Math.floor(columns / 2);

  const columnRemovals = Array(columns).fill(0);

  for (let row = 0; row < rows; row++) {
    const availableColumns = [];
    for (let column = 0; column < columns; column++) {
      if (columnRemovals[column] < rows - 1) {
        availableColumns.push(column);
      }
    }

    availableColumns.sort(() => Math.random() - 0.5);

    let removedCount = 0;
    for (
      let i = 0;
      i < availableColumns.length && removedCount < toRemovePerRow;
      i++
    ) {
      const column = availableColumns[i];
      if (columnRemovals[column] < rows - 1) {
        board[column][row] = "";
        columnRemovals[column]++;
        removedCount++;
      }
    }
  }

  board = board[0].map((_, i) => board.map((row) => row[i]));

  return board;
}

function generateBarcode(board) {
  let barcodeData = "";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const number = board[i][j];
      if (number != "") {
        barcodeData = barcodeData.concat(number.toString().padStart(2, "0"));
      }
    }
  }

  const canvas = document.createElement("canvas");
  JsBarcode(canvas, barcodeData, {
    format: "CODE128",
    width: 2,
    height: 20,
    displayValue: false,
  });

  return canvas.toDataURL("image/png");
}

function generatePDF(n_boards = 10, columns = 9, rows = 3, pdfName = "bingo_boards") {
  const doc = new jsPDF();

  const cellWidth = 18;
  const cellHeight = 18;
  const xStart = 5;
  const yStart = 10;
  const fontSize = 25;
  const margin = 5;
  const boardsPerPage = Math.floor(350 / (rows * cellHeight + margin + 25));

  for (let i = 0; i < n_boards; i++) {
    if (i != 0 && i % boardsPerPage == 0) {
      doc.addPage();
    }

    const board = generateBoard(rows, columns);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const titleText = "bingo.nicog.es";
    const boardYPosition =
      yStart + (i % boardsPerPage) * (rows * cellHeight + 20); // Y position of the board

    const boardHeight =
      boardYPosition +
      rows * cellHeight +
      margin -
      (boardYPosition - margin) +
      1.5 * margin; // Height of the board, including margin
    const boardWidth =
      xStart + columns * cellWidth + margin - (xStart - margin) + 0.75 * margin; // Width of the board, including margin

    // Draw the outer frame (border) for the entire card
    doc.setDrawColor(0, 0, 0); // Black color for the border
    doc.setLineWidth(0.5);
    doc.rect(
      xStart - margin / 2,
      boardYPosition - margin / 2 - 5,
      boardWidth,
      boardHeight
    ); // Outer frame

    // Title text and barcode positioning
    doc.text(titleText, xStart, boardYPosition); // Adjust title position

    const barcodeX = xStart + doc.getTextWidth(titleText) + 10; // Positioning barcode next to title text
    const barcodeY = boardYPosition - 6; // Adjust barcode position
    doc.addImage(generateBarcode(board), "PNG", barcodeX, barcodeY, 70, 10);

    doc.setFontSize(fontSize);
    let x, y;
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        const number = board[row][col];
        x = xStart + col * cellWidth + margin;
        y = boardYPosition + row * cellHeight + margin;

        // Draw a filled rectangle for empty cells
        if (!number) {
          doc.setFillColor(230, 230, 230); // Light grey color for empty cells
          doc.rect(x, y, cellWidth, cellHeight, "F"); // 'F' fills the rectangle
        }

        // Draw cell border
        doc.setFillColor(255, 255, 255); // Set fill color to white for numbers
        doc.rect(x, y, cellWidth, cellHeight); // Cell border

        if (number) {
          // Set font to bold for numbers
          doc.setFont("helvetica", "bold");

          // Calculate the text position to center it vertically and horizontally
          const textWidth = doc.getTextWidth(number.toString());
          const textX = x + (cellWidth - textWidth) / 2; // Center the number horizontally
          const textY = y + (cellHeight + fontSize) / 2 - fontSize / 3; // Center the number vertically

          doc.text(number.toString(), textX, textY);
        }
      }
    }

    if (i < n_boards - 1) {
      // doc.addPage();
    }
  }

  doc.save(`${pdfName}.pdf`);
}

export { generatePDF };
