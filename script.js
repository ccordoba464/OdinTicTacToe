/* GAME BOARD OBJECT */

const gameBoard = (() => {
  const boardElement = document.getElementById("game-board");
  const panes = boardElement.querySelectorAll(".pane");
  const gameBoard = [];

  const clickStatus = Array.from({ length: 9 }, () => false);

  const initiateBoard = () => {
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
  };

  const getGameBoard = () => {
    return gameBoard;
  };

  return { getGameBoard, initiateBoard };
})();

/* DISPLAY CONTROLLER OBJECT */

const displayController = (() => {
  const results = document.getElementById("results");
  const player1Container = document.getElementById("player1-container");
  const player2Container = document.getElementById("player2-container");

  const displayPlayerForm = () => {
    const playerInfoHeader1 = document.getElementById("player1-header");
    const playerForm1 = document.createElement("form");
    playerForm1.id = "player-form1";
    const nameInput1 = document.createElement("input");
    nameInput1.placeholder = "Enter Name";
    nameInput1.setAttribute("required", "true");
    const submitButton1 = document.createElement("button");
    submitButton1.id = "submit-player1";
    submitButton1.type = "button";
    submitButton1.textContent = "Submit Name";
    playerForm1.append(nameInput1, submitButton1);
    player1Container.appendChild(playerForm1);

    submitButton1.addEventListener("click", () => {
      if (nameInput1.checkValidity()) {
        playerInfoHeader1.textContent = nameInput1.value;
        gameFlow.player0.name = nameInput1.value;
        playerForm1.remove();
        const symbol1 = document.createElement("div");
        symbol1.classList.add("symbol");
        symbol1.textContent = gameFlow.player0.symbol;
        player1Container.appendChild(symbol1);
      } else {
        alert("Enter Player 1's name");
      }
    });

    const playerInfoHeader2 = document.getElementById("player2-header");
    const playerForm2 = document.createElement("form");
    playerForm2.id = "player-form2";
    const nameInput2 = document.createElement("input");
    nameInput2.placeholder = "Enter Name";
    nameInput2.setAttribute("required", "true");
    const submitButton2 = document.createElement("button");
    submitButton2.id = "submit-player2";
    submitButton2.type = "button";
    submitButton2.textContent = "Submit Name";
    playerForm2.append(nameInput2, submitButton2);
    player2Container.appendChild(playerForm2);

    submitButton2.addEventListener("click", () => {
      if (nameInput2.checkValidity()) {
        playerInfoHeader2.textContent = nameInput2.value;
        gameFlow.player1.name = nameInput2.value;
        playerForm2.remove();
        const symbol2 = document.createElement("div");
        symbol2.classList.add("symbol");
        symbol2.textContent = gameFlow.player1.symbol;
        player2Container.appendChild(symbol2);
      } else {
        alert("Enter Player 1's name");
      }
    });
  };

  const displayChoices = () => {
    for (let i = 0; i < 9; i++) {
      let pane = document.getElementById(`pane-${i + 1}`);
      pane.textContent = gameBoard.getGameBoard()[i];
    }
  };

  const displayResults = result => {
    if (result === "W") {
      results.textContent = `WINNER: ${gameFlow.getPlayerTurn().name}`;
    } else if (result === "D") {
      results.textContent = "DRAW";
    } else if (result == "X" || result == "O") {
      results.textContent = `${result} goes first!`;
    }
  };

  return { displayChoices, displayResults, displayPlayerForm };
})();

/* PLAYER OBJECT */

const player = (name, symbol) => {
  const choosePane = paneID => {
    gameBoard.getGameBoard()[+paneID.charAt(5) - 1] = symbol;
    gameFlow.incrementTurns();
  };
  return { symbol, name, choosePane };
};

/* GAME FLOW OBJECT */

const gameFlow = (() => {
  const getNames = () => {
    displayController.displayPlayerForm();
  };

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

  let player0;
  let player1;

  if (Math.random() < 0.5) {
    player0 = player("Player 1", "X");
    player1 = player("Player 2", "O");
  } else {
    player0 = player("Player 1", "O");
    player1 = player("Player 2", "X");
  }

  let turns = 0;

  let playerTurn = Math.random() < 0.5 ? player0 : player1;

  getNames();
  displayController.displayResults(playerTurn.symbol);
  gameBoard.initiateBoard();

  return { getPlayerTurn, checkWinner, incrementTurns, player0, player1 };
})();
