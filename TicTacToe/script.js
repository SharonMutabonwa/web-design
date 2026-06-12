// --- Gameboard Module ---
const Gameboard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const setMark = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };

  const getBoard = () => board;

  const reset = () => {
    for (let i = 0; i < board.length; i++) board[i] = "";
  };

  const getEmptyCells = () => board.map((cell, i) => cell === "" ? i : null).filter(i => i !== null);

  return { setMark, getBoard, reset, getEmptyCells };
})();

// --- Player Factory ---
const Player = (name, mark, isAI = false) => {
  return { name, mark, isAI };
};

// --- Game Module ---
const Game = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameOver = false;
  let winningLine = [];

  const init = (player1Name, player2Name) => {
    const isAI = player2Name.toLowerCase() === "ai";
    players = [
      Player(player1Name, "X"),
      Player(player2Name, "O", isAI)
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    winningLine = [];
    Gameboard.reset();
  };

  const playTurn = (index) => {
    if (gameOver) return;

    const currentPlayer = players[currentPlayerIndex];
    if (Gameboard.setMark(index, currentPlayer.mark)) {
      if (checkWin(currentPlayer.mark)) {
        gameOver = true;
        return `${currentPlayer.name} wins!`;
      } else if (checkTie()) {
        gameOver = true;
        return "It's a tie!";
      } else {
        currentPlayerIndex = 1 - currentPlayerIndex;

        // AI move if next player is AI
        const nextPlayer = players[currentPlayerIndex];
        if (!gameOver && nextPlayer.isAI) {
          setTimeout(() => {
            const aiMove = AI.getMove();
            const result = playTurn(aiMove);
            DisplayController.render();
            if (result) DisplayController.showMessage(result);
          }, 300); // small delay for realism
        }
      }
    }
  };

  const checkWin = (mark) => {
    const b = Gameboard.getBoard();
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let condition of winConditions) {
      if (condition.every(i => b[i] === mark)) {
        winningLine = condition;
        return true;
      }
    }
    return false;
  };

  const checkTie = () => Gameboard.getBoard().every(cell => cell !== "");

  const getWinningLine = () => winningLine;
  const isGameOver = () => gameOver;
  const getCurrentPlayer = () => players[currentPlayerIndex];

  return { init, playTurn, getWinningLine, isGameOver, getCurrentPlayer };
})();

// --- AI Module ---
const AI = (() => {
  const getMove = () => {
    const emptyCells = Gameboard.getEmptyCells();
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  };

  return { getMove };
})();

// --- Display Controller Module ---
const DisplayController = (() => {
  const boardContainer = document.querySelector(".board");
  const messageContainer = document.querySelector(".message");
  const startButton = document.querySelector("#startBtn");
  const restartButton = document.querySelector("#restartBtn");

  const render = () => {
    const board = Gameboard.getBoard();
    boardContainer.innerHTML = "";
    board.forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.textContent = cell;

      // Highlight winning cells
      if (Game.isGameOver() && Game.getWinningLine().includes(index)) {
        cellDiv.classList.add("winning");
      }

      // Disable click if game over or cell taken
      if (!Game.isGameOver() && cell === "") {
        cellDiv.addEventListener("click", () => handleCellClick(index));
      }

      boardContainer.appendChild(cellDiv);
    });
  };

  const handleCellClick = (index) => {
    const result = Game.playTurn(index);
    render();
    if (result) showMessage(result);
  };

  const showMessage = (msg) => {
    messageContainer.textContent = msg;
  };

  const setup = () => {
    startButton.addEventListener("click", () => {
      const player1 = document.querySelector("#player1").value || "Player 1";
      const player2 = document.querySelector("#player2").value || "Player 2";
      Game.init(player1, player2);
      showMessage("");
      render();

      // If AI is first player
      if (Game.getCurrentPlayer().isAI) {
        setTimeout(() => {
          const aiMove = AI.getMove();
          const result = Game.playTurn(aiMove);
          render();
          if (result) showMessage(result);
        }, 300);
      }
    });

    restartButton.addEventListener("click", () => {
      const player1 = document.querySelector("#player1").value || "Player 1";
      const player2 = document.querySelector("#player2").value || "Player 2";
      Game.init(player1, player2);
      showMessage("");
      render();
    });
  };

  return { setup, render, showMessage };
})();

// --- Initialize ---
DisplayController.setup();