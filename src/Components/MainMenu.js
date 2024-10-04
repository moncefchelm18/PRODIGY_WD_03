import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import singlePlayerIcon from "../assets/icons8-player-64.png";
import multiPlayerIcon from "../assets/icons8-multiplayer2-64.png";
import XOImage from "../assets/xo.png";
import ControlMusicButton from "../assets/ControlMusicButton";
const MainMenu = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(true);
  }, []);
  const handleSelectGameMode = (gameMode) => {
    navigate(`/${gameMode}`);
  };
  return (
    <>
      <section className="main-menu-section">
        <div className="return-btn">
          <ControlMusicButton />
        </div>
        <div>
          <div className={`box main-menu-box ${isActive ? "active" : ""}`}>
            <h1 className="main-menu-header">Tic Tac Toe Game</h1>
            <div className="main-menu-img">
              <img src={XOImage} height={96} alt="XO Tic Tac Toe Game" />
            </div>
            <h4 className="main-menu-title">Main Menu</h4>
            <div className="main-menu-buttons">
              <button
                onClick={() => handleSelectGameMode("single-player")}
                className="btn"
              >
                Single player
                <span>
                  <img
                    width="32"
                    height="32"
                    src={singlePlayerIcon}
                    alt="external-multiplayer-esport-itim2101-flat-itim2101"
                  />
                </span>
              </button>
              <button
                onClick={() => handleSelectGameMode("multi-player")}
                className="btn btn2"
              >
                Multiplayer
                <span>
                  <img
                    width="32"
                    height="32"
                    src={multiPlayerIcon}
                    alt="external-multiplayer-esport-itim2101-flat-itim2101"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainMenu;
