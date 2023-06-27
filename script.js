const gameBoardModule = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];

  const choosePane = paneID => {
    console.log(paneID);
    gameBoard[+paneID.charAt(5) - 1] = "O";
    displayController.displayChoices(gameBoard);
  };

  return { gameBoard, choosePane };
})();

const displayController = (() => {
  const boardElement = document.getElementById("game-board");
  const panes = boardElement.querySelectorAll(".pane");

  panes.forEach(pane => {
    pane.addEventListener("click", () => {
      gameBoardModule.choosePane(pane.id);
    });
  });

  const displayChoices = gameBoard => {
    for (let i = 0; i < 9; i++) {
      let pane = document.getElementById(`pane-${i + 1}`);
      pane.textContent = gameBoard[i];
    }
  };

  return { displayChoices };
})();

const player = symbol => {
  return { symbol };
};

const gameFlow = (() => {
  const player1 = player("X");
  const player2 = player("O");
})();

displayController.displayChoices(gameBoardModule.gameBoard);
