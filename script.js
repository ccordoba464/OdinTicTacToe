const gameBoardModule = (() => {
  const gameBoard = ["X", "X", "O", "X", "X", "X", "X", "X", "X"];
  return { gameBoard };
})();

const displayController = (() => {
  const displayChoices = gameBoard => {
    for (let i = 0; i < 9; i++) {
      let pane = document.getElementById(`pane-${i + 1}`);
      let choice = document.createElement("span");
      choice.textContent = gameBoard[i];
      pane.appendChild(choice);
    }
  };

  return { displayChoices };
})();

displayController.displayChoices(gameBoardModule.gameBoard);

const player = () => {};
