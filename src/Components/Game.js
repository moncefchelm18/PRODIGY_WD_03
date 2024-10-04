import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../assets/BackButton";
import XIcon from "../assets/x.png";
import OIcon from "../assets/o.png";
import xClickSound from "../assets/music/x-click.mp3";
import oClickSound from "../assets/music/o-click.mp3";
import SinglePlayerIcon from "../assets/icons8-player-64.png";
import MultiPlayerIcon from "../assets/icons8-multiplayer-64.png";
import ResetIcon from "../assets/icons8-reset-64.png";
import ControlMusicButton from "../assets/ControlMusicButton";
import WinLoseDrawState from "./WinLoseDrawState";
import GameMulti from "./GameMulti";
import GameSingle from "./GameSingle";

const Game = () => {
  const { difficulty } = useParams();
  const { "play-option": gameMode } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const playerSelection = localStorage.getItem("player");
  const computerSelection = localStorage.getItem("computer");
  const gameBoardCells = document.querySelectorAll(".game-board-cell");
  const [winner, setWinner] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);
  const [displayResultState, setDisplayResultState] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    difficulty || "easy"
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const xClick = new Audio(xClickSound);
  const oClick = new Audio(oClickSound);
  console.log("windowWidth", windowWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      });
    };
    console.log("windowWidth", windowWidth);
  }, []);

  const gameSectionRef = useRef(null);
  const [result, setResult] = useState(null);
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(true);
  }, []);
  console.log("Difficulty", difficulty);
  const checkWinner = (newBoard) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setResult(newBoard[a]);
        return newBoard[a]; // Return the winner (either 'X' or 'O')
      }
    }
    if (newBoard.every((cell) => cell !== null)) {
      setDrawScore(drawScore + 1);
      setBoard(Array(9).fill(null));
      showResultState();
      // setTimeout(() => alert("It's a draw!"), 100);
      setResult("Draw");
      return "Draw"; // If no empty cells and no winner, it's a draw
    }
    return null;
  };

  const checkWinnerForMinimax = (newBoard) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    if (newBoard.every((cell) => cell !== null)) {
      return "Draw";
    }
    return null;
  };
  const toggle = (e, cell) => {
    if (board[cell] || !isPlayerTurn) return;
    const newBoard = [...board];
    newBoard[cell] = playerSelection;
    setBoard(newBoard);
    setIsPlayerTurn(false);

    if (playerSelection === "X") {
      e.target.innerHTML = `<img src=${XIcon} height={32} alt="X" />`;
      xClick.play();
    }
    if (playerSelection === "O") {
      e.target.innerHTML = `<img src=${OIcon} height={64} alt="O" />`;
      oClick.play();
    }
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      if (result === playerSelection) {
        setPlayerScore(playerScore + 1);

        showResultState();

        // setTimeout(() => alert(`Player wins with ${playerSelection}!`), 100);
      }
      return;
    }
  };
  const getRandomMove = (emptyCells) => {
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };
  const getBlockingMove = (newBoard) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        (newBoard[a] === playerSelection &&
          newBoard[a] === newBoard[b] &&
          !newBoard[c]) ||
        (newBoard[a] === playerSelection &&
          newBoard[a] === newBoard[c] &&
          !newBoard[b]) ||
        (newBoard[b] === playerSelection &&
          newBoard[b] === newBoard[c] &&
          !newBoard[a])
      ) {
        return !newBoard[c] ? c : !newBoard[b] ? b : a;
      }
    }
    return null;
  };
  const minimax = (newBoard, isMaximizing) => {
    const result = checkWinnerForMinimax(newBoard);
    if (result === computerSelection) return 1;
    if (result === playerSelection) return -1;
    if (result === "Draw") return 0;

    const emptyCells = newBoard
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null);

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let index of emptyCells) {
        newBoard[index] = computerSelection;
        const score = minimax(newBoard, false);
        newBoard[index] = null;
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let index of emptyCells) {
        newBoard[index] = playerSelection;
        const score = minimax(newBoard, true);
        newBoard[index] = null;
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  };

  const getBestMove = (newBoard) => {
    const emptyCells = newBoard
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null);
    let bestMove;
    let bestScore = -Infinity;
    for (let index of emptyCells) {
      newBoard[index] = computerSelection;
      const score = minimax(newBoard, false);
      newBoard[index] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = index;
      }
    }
    return bestMove;
  };
  const getWinningMove = (newBoard) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        (newBoard[a] === computerSelection &&
          newBoard[a] === newBoard[b] &&
          !newBoard[c]) ||
        (newBoard[a] === computerSelection &&
          newBoard[a] === newBoard[c] &&
          !newBoard[b]) ||
        (newBoard[b] === computerSelection &&
          newBoard[b] === newBoard[c] &&
          !newBoard[a])
      ) {
        return !newBoard[c] ? c : !newBoard[b] ? b : a;
      }
    }
    return null;
  };

  const handleComputerMove = () => {
    if (isPlayerTurn || winner) return;
    const emptyCells = board
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null);
    if (emptyCells.length === 0) return;
    const newBoard = [...board];
    let moveIndex;
    const isFirstMove = board.every((cell) => cell === null);
    const isSecondMove = board.filter((cell) => cell !== null).length === 1;

    if (difficulty === "easy") {
      moveIndex = getRandomMove(emptyCells);
    } else if (difficulty === "medium") {
      moveIndex =
        getWinningMove(newBoard) ??
        getBlockingMove(newBoard) ??
        getRandomMove(emptyCells);
    } else if (difficulty === "hard" && isFirstMove) {
      moveIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    } else if (difficulty === "hard") {
      moveIndex = getBestMove(newBoard);
    }

    newBoard[moveIndex] = computerSelection;
    console.log("iiiiiii", moveIndex);
    if (computerSelection === "X") {
      xClick.play();
      gameBoardCells[moveIndex].innerHTML = `<img src=${XIcon}  alt="X" />`;
    } else if (computerSelection === "O") {
      oClick.play();
      gameBoardCells[moveIndex].innerHTML = `<img src=${OIcon}  alt="O" />`;
    }
    setBoard(newBoard);
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      if (result === computerSelection) {
        setComputerScore(computerScore + 1);
        setTimeout(showResultState(), 100);
        // setTimeout(
        //   () => alert(`Computer wins with ${computerSelection}!`),
        //   100
        // );
      }
      return;
    }

    setIsPlayerTurn(true);
  };
  useEffect(() => {
    if (!isPlayerTurn) {
      setTimeout(handleComputerMove, 500);
    }
  }, [isPlayerTurn, board]);

  const playAgain = () => {
    gameSectionRef.current.style.pointerEvents = "auto";
    setBoard(Array(9).fill(null));
    setWinner(null);
    if (winner === playerSelection) {
      setIsPlayerTurn(true);
    } else if (winner === computerSelection) {
      setIsPlayerTurn(false);
    } else if (winner === "Draw") {
      const random = Math.floor(Math.random() * 2);
      if (random === 0) {
        setIsPlayerTurn(false);
      } else {
        setIsPlayerTurn(true);
      }
    } else {
      setIsPlayerTurn(true);
    }
    setActive(false);
    setResult(null);

    gameBoardCells.forEach((cell) => (cell.innerHTML = ""));
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);

    const random = Math.floor(Math.random() * 2);
    if (random === 0) {
      setIsPlayerTurn(false);
    } else {
      setIsPlayerTurn(true);
    }
    setComputerScore(0);
    setPlayerScore(0);
    setDrawScore(0);
    setResult(null);
    gameBoardCells.forEach((cell) => (cell.innerHTML = ""));
  };
  const handleDifficultyChange = (e) => {
    const newDifficulty = e.target.value;
    setSelectedDifficulty(newDifficulty);
    // Navigate to the updated URL with the new difficulty
    navigate(`/single-player/difficulty/${newDifficulty}/game`);
    resetBoard();
  };
  console.log("emptyCells: ", board);

  const showResultState = () => {
    setActive(true);
    gameSectionRef.current.style.pointerEvents = "none";
  };

  const displayXOrO = (e, cell) => {
    console.log("board", board[cell]);
    if (!isPlayerTurn || winner) return;
    if (board[cell] || !isPlayerTurn) return;
    if (playerSelection === "X") {
      e.target.innerHTML = `<img src=${XIcon} height={32} alt="X" style="opacity: 0.5;"/>`;
    }
    if (playerSelection === "O") {
      e.target.innerHTML = `<img src=${OIcon} height={64} alt="O" style="opacity: 0.5;"/>`;
    }
  };
  const clearHoverEffect = (e, cell) => {
    // Only clear the hover effect if the cell is still empty (i.e., hasn't been clicked)
    if (board[cell]) return;

    e.target.innerHTML = ""; // Clear the hover effect
  };

  console.log("aqppwpwpwpwpw", result);

  return (
    <>
      <section className="game-section">
        {showResultState && (
          <WinLoseDrawState
            result={result}
            onPlayAgain={playAgain}
            active={active}
            // onClick={() => setActive(false)}
          />
        )}
        <div className="return-btn">
          <BackButton
            link={
              gameMode === "single-player"
                ? "/single-player/difficulty"
                : "/multi-player"
            }
          />
          <ControlMusicButton />
        </div>

        {gameMode === "single-player" ? (
          <>
            <GameSingle />
          </>
        ) : (
          <>
            <GameMulti />
          </>
        )}
      </section>
    </>
  );
};

export default Game;
