import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import XIcon from "../assets/x.png";
import OIcon from "../assets/o.png";
import WinLoseDrawState from "./WinLoseDrawState";
import ResetIcon from "../assets/icons8-reset-64.png";
import MultiPlayerIcon from "../assets/icons8-multiplayer-64.png";
import SinglePlayerIcon from "../assets/icons8-player-64.png";

import xClickSound from "../assets/music/x-click.mp3";
import oClickSound from "../assets/music/o-click.mp3";

import "../styles/SelectXOMultiPlayer.css";

const GameMulti = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const { "play-option": gameMode } = useParams();
  const navigate = useNavigate();
  const [currentPlayer, setCurrentPlayer] = useState("player1"); // Alternate between player1 and player2
  const [winner, setWinner] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const gameBoardCells = document.querySelectorAll(".game-board-cell");
  const player1Selection = localStorage.getItem("player1");
  const player2Selection = localStorage.getItem("player2");
  const [result, setResult] = useState(null);
  const [active, setActive] = useState(false);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [drawScore, setDrawScore] = useState(0);
  const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
  const gameSectionRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const xClick = new Audio(xClickSound);
  const oClick = new Audio(oClickSound);
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
  useEffect(() => {
    if (player1Selection === null || player2Selection === null) {
      localStorage.setItem("player1", "X");
      localStorage.setItem("player2", "O");
    }
  }, []);
  useEffect(() => {
    console.log("windowWidth", windowWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
      });
    };
  }, []);

  // Check for a winner or draw
  const checkWinner = (newBoard) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setResult(newBoard[a]);
        setWinner(newBoard[a]); // Set the winner
        setIsGameOver(true);
        setActive(true);
        return newBoard[a];
      }
    }
    if (newBoard.every((cell) => cell !== null)) {
      setDrawScore(drawScore + 1);
      setBoard(Array(9).fill(null));
      showResultState();
      setIsGameOver(true);
      setResult("Draw");
      return "Draw";
    }
    return null;
  };

  // Handle clicking on a cell
  const handleCellClick = (e, cell) => {
    if (board[cell] || isGameOver) return;

    const newBoard = [...board];
    const currentSelection =
      currentPlayer === "player1" ? player1Selection : player2Selection;

    newBoard[cell] = currentSelection;
    setBoard(newBoard);

    // Display the clicked cell's X or O
    if (currentSelection === "X") {
      e.target.innerHTML = `<img src=${XIcon} height={32} alt="X" />`;
      xClick.play();
    } else {
      e.target.innerHTML = `<img src=${OIcon} height={64} alt="O" />`;
      oClick.play();
    }

    // Check for a winner
    const result = checkWinner(newBoard);
    if (result) {
      if (result === player1Selection) {
        setPlayer1Score((prevScore) => prevScore + 1);
      } else if (result === player2Selection) {
        setPlayer2Score((prevScore) => prevScore + 1);
      }
      showResultState();
    }
    if (!result) {
      // Switch turns if no winner
      setCurrentPlayer(currentPlayer === "player1" ? "player2" : "player1");
    }
  };

  // Reset the game board
  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("player1");
    setWinner(null);
    setIsGameOver(false);
    setActive(false);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setDrawScore(0);
    setResult(null);
    gameBoardCells.forEach((cell) => (cell.innerHTML = ""));
  };

  // Play again after the game ends
  const playAgain = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsGameOver(false);
    setActive(false);
    setResult(null);
    gameBoardCells.forEach((cell) => (cell.innerHTML = ""));
  };

  const showResultState = () => {
    setActive(true);
    gameBoardCells.pointerEvents = "none";
  };
  console.log("resultxxx", result);
  console.log("activeYYYYYY", active);
  return (
    <>
      {(result === "X" ||
        result === "O" ||
        result === "Draw" ||
        showResultState) && (
        <WinLoseDrawState
          result={result}
          onPlayAgain={playAgain}
          active={active}
        />
      )}
      <div className={`score-box multi box ${isActive ? "active" : ""}`}>
        <div className="switch-game-mode-box">
          <div
            className={`switch-game-mode-btn ${
              gameMode === "single-player" ? "active" : ""
            }`}
            onClick={() => navigate("/single-player/difficulty/easy/game")}
          >
            <img src={SinglePlayerIcon} height={64} alt="single-player" />
          </div>
          <div
            className={`switch-game-mode-btn ${
              gameMode === "multi-player" ? "active" : ""
            }`}
            onClick={() => navigate("/multi-player/game")}
          >
            <img src={MultiPlayerIcon} height={64} alt="single-player" />
          </div>
        </div>
        <div className="score-board multi">
          <h1 className="score-header">Score Board</h1>
          <div className="scores">
            <div className="player1-score">
              <h3>Player 1</h3>
              <h4>{player1Score}</h4>
            </div>
            <div className="draw-score">
              <h3>Draw</h3>
              <h4>{drawScore}</h4>
            </div>
            <div className="player2-score">
              <h3>Player 2</h3>
              <h4>{player2Score}</h4>
            </div>
          </div>
        </div>
        {windowWidth >= 768 ? (
          <>
            <div className="separator2 s2"></div>
          </>
        ) : (
          <></>
        )}
        {windowWidth >= 768 ? (
          <>
            <div className="action-buttons">
              <div className="reset-btn" onClick={resetBoard}>
                <img src={ResetIcon} height={32} alt="reset" />
              </div>
              <div className="play-again-btn btn2" onClick={playAgain}>
                Play again
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={` game-box box ${isActive ? "active" : ""}`}>
        <div className="game-board">
          <div className="turn">
            {currentPlayer === "player1" ? (
              <>
                It's <span className="p1">Player 1</span> Turn{" "}
                <span>{player1Selection}</span>
              </>
            ) : (
              <>
                It's <span className="p2">Player 2</span> Turn{" "}
                <span>{player2Selection}</span>
              </>
            )}
          </div>
          <div className="game-board-row row1">
            {[0, 1, 2].map((cell) => (
              <>
                <div
                  key={cell}
                  className="game-board-cell"
                  onClick={(e) => handleCellClick(e, cell)}
                  // onMouseEnter={(e) => displayXOrO(e, cell)}
                ></div>
                {cell === 2 ? null : <div className="separator"></div>}
              </>
            ))}
          </div>
          <div className="separator2"></div>
          <div className="game-board-row row2">
            {[3, 4, 5].map((cell) => (
              <>
                <div
                  key={cell}
                  className="game-board-cell"
                  onClick={(e) => handleCellClick(e, cell)}
                  // onMouseEnter={(e) => displayXOrO(e, cell)}
                ></div>
                {cell === 5 ? null : <div className="separator"></div>}
              </>
            ))}
          </div>
          <div className="separator2"></div>
          <div className="game-board-row row3">
            {[6, 7, 8].map((cell) => (
              <>
                <div
                  key={cell}
                  className="game-board-cell"
                  onClick={(e) => handleCellClick(e, cell)}
                  // onMouseEnter={(e) => displayXOrO(e, cell)}
                ></div>
                {cell === 8 ? null : <div className="separator"></div>}
              </>
            ))}
          </div>
        </div>
      </div>
      {windowWidth < 768 ? (
        <>
          <div className="action-buttons2">
            <div className="reset-btn" onClick={resetBoard}>
              <img src={ResetIcon} height={32} alt="reset" />
            </div>
            <div className="play-again-btn btn2" onClick={playAgain}>
              Play again
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default GameMulti;
