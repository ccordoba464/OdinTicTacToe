const gameBoard = (() => {
  const boardElement = document.getElementById("game-board");
  const panes = boardElement.querySelectorAll(".pane");
  const gameBoard = [];

  const clickStatus = Array.from({ length: 9 }, () => false);

  panes.forEach((pane, index) => {
    pane.addEventListener("click", () => {
      if (clickStatus[index]) {
        return; // Exit early if the pane has been clicked before
      }
      gameFlow.getPlayerTurn().choosePane(pane.id);
      displayController.displayChoices();
      gameFlow.checkWinner();

      clickStatus[index] = true;
    });
  });

  const getGameBoard = () => {
    return gameBoard;
  };

  return { getGameBoard };
})();

const displayController = (() => {
  const results = document.getElementById("results");

  const displayChoices = () => {
    for (let i = 0; i < 9; i++) {
      let pane = document.getElementById(`pane-${i + 1}`);
      pane.textContent = gameBoard.getGameBoard()[i];
    }
  };

  const displayResults = result => {
    if (result === "W") {
      results.textContent = `WINNER: ${gameFlow.getPlayerTurn().symbol}`;
    } else if (result === "D") {
      results.textContent = "DRAW";
    }
  };

  return { displayChoices, displayResults };
})();

const player = symbol => {
  const choosePane = paneID => {
    gameBoard.getGameBoard()[+paneID.charAt(5) - 1] = symbol;
    gameFlow.incrementTurns();
  };
  return { symbol, choosePane };
};

const gameFlow = (() => {
  const player0 = player("X");
  const player1 = player("O");
  let turns = 0;

  let playerTurn = Math.random() < 0.5 ? player0 : player1;

  const getPlayerTurn = () => {
    return playerTurn;
  };

  const incrementTurns = () => {
    turns++;
  };

  const checkWinner = () => {
    if (
      (gameBoard.getGameBoard()[1] === gameBoard.getGameBoard()[0] &&
        gameBoard.getGameBoard()[1] === gameBoard.getGameBoard()[2] &&
        gameBoard.getGameBoard()[1] == gameFlow.getPlayerTurn().symbol) ||
      (gameBoard.getGameBoard()[4] === gameBoard.getGameBoard()[3] &&
        gameBoard.getGameBoard()[4] === gameBoard.getGameBoard()[5] &&
        gameBoard.getGameBoard()[4] == gameFlow.getPlayerTurn().symbol) ||
      (gameBoard.getGameBoard()[7] === gameBoard.getGameBoard()[6] &&
        gameBoard.getGameBoard()[7] === gameBoard.getGameBoard()[8] &&
        gameBoard.getGameBoard()[7] == gameFlow.getPlayerTurn().symbol) ||
      (gameBoard.getGameBoard()[3] === gameBoard.getGameBoard()[0] &&
        gameBoard.getGameBoard()[3] === gameBoard.getGameBoard()[6] &&
        gameBoard.getGameBoard()[3] == gameFlow.getPlayerTurn().symbol) ||
      (gameBoard.getGameBoard()[4] === gameBoard.getGameBoard()[1] &&
        gameBoard.getGameBoard()[4] === gameBoard.getGameBoard()[7] &&
        gameBoard.getGameBoard()[4] == gameFlow.getPlayerTurn().symbol) ||
      (gameBoard.getGameBoard()[5] === gameBoard.getGameBoard()[2] &&
        gameBoard.getGameBoard()[5] === gameBoard.getGameBoard()[8] &&
        gameBoard.getGameBoard()[5] == gameFlow.getPlayerTurn().symbol) ||
      (gameBoard.getGameBoard()[4] === gameBoard.getGameBoard()[0] &&
        gameBoard.getGameBoard()[4] === gameBoard.getGameBoard()[8] &&
        gameBoard.getGameBoard()[4] == gameFlow.getPlayerTurn().symbol) ||
      (gameBoard.getGameBoard()[4] === gameBoard.getGameBoard()[2] &&
        gameBoard.getGameBoard()[4] === gameBoard.getGameBoard()[6] &&
        gameBoard.getGameBoard()[4] == gameFlow.getPlayerTurn().symbol)
    ) {
      displayController.displayResults("W");
    } else if (turns === 9) {
      displayController.displayResults("D");
    } else {
      playerTurn = playerTurn === player0 ? player1 : player0;
    }
  };

  return { getPlayerTurn, checkWinner, incrementTurns };
})();
