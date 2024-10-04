import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import XIcon from "../assets/x.png";
import OIcon from "../assets/o.png";
import BackButton from "../assets/BackButton";
import NextButton from "../assets/NextButton";
import ResetIcon from "../assets/icons8-reset2-64.png";
import ControlMusicButton from "../assets/ControlMusicButton";
import "../styles/SelectXOMultiPlayer.css";

const SelectXOMultiPlayer = () => {
  const imgX = useRef(null);
  const imgO = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [playerChoiceTurn, setPlayerChoiceTurn] = useState("Player 1");
  const [isPlayer1Selected, setIsPlayer1Selected] = useState(false);

  useEffect(() => {
    localStorage.removeItem("player1");
    localStorage.removeItem("player2");
    setIsActive(true);
  }, []);

  const handleSelection = (e) => {
    const selectedId = e.target.id;

    // If Player 1 hasn't selected yet
    if (!isPlayer1Selected) {
      console.log("Pasdasdasdasdasdas");
      if (selectedId === "X") {
        imgX.current.classList.add("active-blue");
        console.log("Pasdasdasdasdasdas2");
        localStorage.setItem("player1", "X");
        localStorage.setItem("player2", "O");
        setPlayerChoiceTurn("Player 2");
      } else if (selectedId === "O") {
        imgO.current.classList.add("active-blue");
        localStorage.setItem("player1", "O");
        localStorage.setItem("player2", "X");
        setPlayerChoiceTurn("Player 2");
      }
      setIsPlayer1Selected(true);
    }
    // Player 2 can only select the remaining option
    else {
      if (selectedId === "X" && localStorage.getItem("player1") !== "X") {
        imgX.current.classList.add("active-red");
        localStorage.setItem("player2", "X");
      } else if (
        selectedId === "O" &&
        localStorage.getItem("player1") !== "O"
      ) {
        imgO.current.classList.add("active-red");
        localStorage.setItem("player2", "O");
      }
    }

    console.log("Player 1", localStorage.getItem("player1"));
    console.log("Player 2", localStorage.getItem("player2"));
  };

  const resetSelections = () => {
    imgX.current.classList.remove("active-blue");
    imgO.current.classList.remove("active-blue");
    imgX.current.classList.remove("active-red");
    imgO.current.classList.remove("active-red");
    localStorage.removeItem("player1");
    localStorage.removeItem("player2");
    setIsPlayer1Selected(false);
    setPlayerChoiceTurn("Player 1");
  };

  return (
    <>
      <section className="multi-player-select-xo-section">
        <div className="return-btn">
          <BackButton link={"/"} />
          <ControlMusicButton />
        </div>
        <div
          className={`box multi-player-select-xo-box ${
            isActive ? "active" : ""
          }`}
        >
          <h1 className="player-header">
            <span className={playerChoiceTurn === "Player 1" ? "p1" : "p2"}>
              {playerChoiceTurn}
            </span>{" "}
            Select Your Side
          </h1>
          <div className="multi-player-select-xo-buttons">
            <img
              id="X"
              ref={imgX}
              src={XIcon}
              height={128}
              alt="X"
              onClick={handleSelection}
            />
            <div className="separator"></div>

            <img
              id="O"
              ref={imgO}
              src={OIcon}
              height={128}
              alt="O"
              onClick={handleSelection}
            />
          </div>
          <div className="actions-btn-multi">
            <div className="reset-btn reset-btn2" onClick={resetSelections}>
              <img src={ResetIcon} height={32} alt="reset" />
            </div>
            <NextButton link={"game"} />
          </div>
        </div>
      </section>
    </>
  );
};

export default SelectXOMultiPlayer;
