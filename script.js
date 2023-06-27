const gameBoardModule = (() => {
  const gameBoard = ["x", "x", "x", "x", "x", "x", "x", "x", "x"];
  return { gameBoard };
})();

const displayController = (() => {
  const boardElement = document.getElementById("game-board");

  const displayChoices = gameBoard => {
    for (let i = 0; i < 9; i++) {
      let pane = document.getElementById(`pane-${i + 1}`);
      pane.textContent = gameBoard[i];
    }
  };

  return { displayChoices };
})();

displayController.displayChoices(gameBoardModule.gameBoard);

const player = () => {};
