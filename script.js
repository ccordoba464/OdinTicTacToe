/* GAME BOARD OBJECT */

const gameBoard = (() => {
  const boardElement = document.getElementById("game-board");
  const panes = boardElement.querySelectorAll(".pane");
  let gameBoard = [];

  let clickStatus = Array.from({ length: 9 }, () => false);

  const initiateBoard = () => {
    if (gameBoard.length !== 0) {
      gameBoard = [];
      clickStatus = Array.from({ length: 9 }, () => false);
      displayController.displayChoices();
    }
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
  const resetButton = document.getElementById("reset-button");

  resetButton.addEventListener("click", () => {
    gameFlow.startGame();
  });

  const displayPlayerForm = () => {
    if (
      player1Container.querySelector("#player-form1") !== null &&
      player2Container.querySelector("#player-form2") !== null
    ) {
      player1Container.querySelector("#player-form1").remove();
      player2Container.querySelector("#player-form2").remove();
    } else if (player2Container.querySelector("#player-form2") !== null) {
      player2Container.querySelector("#player-form2").remove();
      document.querySelector(".symbol").remove();
    } else if (player1Container.querySelector("#player-form1") !== null) {
      player1Container.querySelector("#player-form1").remove();
      document.querySelector(".symbol").remove();
    } else {
      let symbolSpans = document.querySelectorAll(".symbol");
      if (symbolSpans !== null) {
        symbolSpans.forEach(span => {
          span.remove();
        });
      }
    }

    const playerInfoHeader1 = document.getElementById("player1-header");
    playerInfoHeader1.textContent = "Player 0";
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

    const playerInfoHeader2 = document.getElementById("player2-header");
    playerInfoHeader2.textContent = "Player 1";
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
    player1Container.appendChild(playerForm1);
    player2Container.appendChild(playerForm2);

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
        alert("Enter Player 2's name");
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
  const startGame = () => {
    randomizePlayerTurn();
    displayController.displayPlayerForm();
    displayController.displayResults(playerTurn.symbol);
    gameBoard.initiateBoard();
    turns = 0;
  };

  const randomizePlayerTurn = () => {
    playerTurn = Math.random() < 0.5 ? player0 : player1;
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
  let playerTurn;
  let turns = 0;

  if (Math.random() < 0.5) {
    player0 = player("Player 0", "X");
    player1 = player("Player 1", "O");
  } else {
    player0 = player("Player 0", "O");
    player1 = player("Player 1", "X");
  }

  startGame();

  return {
    getPlayerTurn,
    checkWinner,
    incrementTurns,
    player0,
    player1,
    startGame,
  };
})();
