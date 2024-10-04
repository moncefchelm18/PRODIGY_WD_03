import React from "react";
import { Link, Outlet } from "react-router-dom";
import XIcon from "../assets/x.png";
import OIcon from "../assets/o.png";
import BackButton from "../assets/BackButton";
import { useRef, useState, useEffect } from "react";
import NextButton from "../assets/NextButton";
import ControlMusicButton from "../assets/ControlMusicButton";

const SelectXOSinglePlayer = () => {
  const imgX = useRef(null);
  const imgO = useRef(null);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(true);
    if (
      localStorage.getItem("player") === null &&
      localStorage.getItem("computer") === null
    ) {
      localStorage.setItem("player", "X");
      localStorage.setItem("computer", "O");
    }
  }, []);
  const handleChoiceSelected = (e) => {
    console.log("Selected", e.target.alt);
    if (e.target.alt === "X") {
      // add class active
      imgX.current.classList.add("active");
      imgO.current.classList.remove("active");
      localStorage.setItem("player", "X");
      localStorage.setItem("computer", "O");
    } else {
      imgO.current.classList.add("active");
      imgX.current.classList.remove("active");
      localStorage.setItem("player", "O");
      localStorage.setItem("computer", "X");
    }
  };
  return (
    <>
      <section className="single-player-select-xo-section">
        <div className="return-btn">
          <BackButton link={"/"} />
          <ControlMusicButton />
        </div>
        <div
          className={`box single-player-select-xo-box ${
            isActive ? "active" : ""
          }`}
        >
          <h1 className="player-header ">Choose Your Character :]</h1>
          <div className="single-player-select-xo-buttons">
            <img
              id="X"
              ref={imgX}
              src={XIcon}
              height={128}
              alt="X"
              onClick={handleChoiceSelected}
            />
            <div className="separator"></div>
            <div className="separator2" style={{ display: "none" }}></div>

            <img
              id="O"
              ref={imgO}
              src={OIcon}
              height={128}
              alt="O"
              onClick={handleChoiceSelected}
            />
          </div>
          <NextButton link={"difficulty"} />
        </div>
      </section>
    </>
  );
};

export default SelectXOSinglePlayer;
