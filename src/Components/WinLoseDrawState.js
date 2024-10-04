import React from "react";

import "../styles/WinLoseDrawState.css";
import { useParams } from "react-router-dom";

import winSound from "../assets/music/win.mp3";
import loseSound from "../assets/music/failure.mp3";
import drawSound from "../assets/music/draw.mp3";

const WinLoseDrawState = (props) => {
  const playerSelection = localStorage.getItem("player");
  const computerSelection = localStorage.getItem("computer");
  const player1Selection = localStorage.getItem("player1");
  const player2Selection = localStorage.getItem("player2");
  const { "play-option": gameMode } = useParams();
  const winAudio = new Audio(winSound);
  const loseAudio = new Audio(loseSound);
  const drawAudio = new Audio(drawSound);

  console.log("play-optionaxxxxxxxxxXXXXXX", gameMode);
  console.log("playerSelection", playerSelection);
  console.log("computerSelection", computerSelection);
  console.log("player1Selection", player1Selection);
  console.log("player2Selection", player2Selection);

  console.log("ADAASDPPPPPPPPPPPPP", props.result);
  const resultState = () => {
    if (playerSelection === "X" && props.result === "X") {
      winAudio.play();
      return (
        <>
          You "{playerSelection}" <span>Won</span>
        </>
      );
    }
    if (playerSelection === "O" && props.result === "O") {
      winAudio.play();
      return (
        <>
          You "{playerSelection}" <span>Won</span>
        </>
      );
    } else if (props.result === "Draw") {
      drawAudio.play();
      return (
        <>
          It's A <span>Draw</span>
        </>
      );
    } else if (
      (playerSelection === "X" && props.result === "O") ||
      (playerSelection === "O" && props.result === "X")
    ) {
      loseAudio.play();
      return (
        <>
          You "{playerSelection}" <span>Lost</span>
        </>
      );
    } else {
      return <></>;
    }
  };

  const resultStateMulti = () => {
    if (props.result === "Draw") {
      drawAudio.play();
      return (
        <>
          <h1>
            It's A <span className="multi-draw">Draw</span>
          </h1>
        </>
      );
    }
    if (player1Selection === "X" && props.result === "X") {
      winAudio.play();
      return (
        <>
          <h1>
            Player 1 "{player1Selection}"{" "}
            <span className="multi-won ">Won</span>
          </h1>{" "}
          <h3>
            Player 2 "{player2Selection}"{" "}
            <span className="multi-lose ">Lost</span>
          </h3>
        </>
      );
    }

    if (player1Selection === "O" && props.result === "O") {
      winAudio.play();
      return (
        <>
          <h1>
            Player 1 "{player1Selection}"{" "}
            <span className="multi-won ">Won</span>
          </h1>{" "}
          <h3>
            Player 2 "{player2Selection}"{" "}
            <span className="multi-lose ">Lost</span>
          </h3>
        </>
      );
    }

    if (player2Selection === "X" && props.result === "X") {
      winAudio.play();
      return (
        <>
          <h1>
            Player 2 "{player2Selection}"{" "}
            <span className="multi-won ">Won</span>
          </h1>
          <h3>
            Player 1 "{player1Selection}"{" "}
            <span className="multi-lose ">Lost</span>
          </h3>
        </>
      );
    }

    if (player2Selection === "O" && props.result === "O") {
      winAudio.play();
      return (
        <>
          <h1>
            Player 2 "{player2Selection}"{" "}
            <span className="multi-won ">Won</span>
          </h1>
          <h3>
            Player 1 "{player1Selection}"{" "}
            <span className="multi-lose ">Lost</span>
          </h3>
        </>
      );
    }
  };

  return (
    <>
      <div
        className={
          gameMode === "single-player"
            ? `win-lose-draw-state ${props.active ? "active" : ""}`
            : `win-lose-draw-state multii ${props.active ? "active" : ""}`
        }
      >
        {gameMode === "single-player" ? (
          <>
            <h1
              className={
                props.result === playerSelection
                  ? "winner"
                  : props.result === "Draw"
                  ? "draw"
                  : "lose"
              }
            >
              {resultState ? resultState() : ""}
            </h1>
          </>
        ) : (
          <div className="win-lose-draw-state-multi-desc">
            <>{resultStateMulti ? resultStateMulti() : ""}</>
          </div>
        )}

        <div onClick={props.onPlayAgain} className="btn">
          Play Again
        </div>
      </div>
    </>
  );
};

export default WinLoseDrawState;
