import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../assets/BackButton";
import happyIcon from "../assets/icons8-anime-emoji-96.png";
import boringIcon from "../assets/icons8-boring-96.png";
import shockedIcon from "../assets/icons8-shocked-96.png";
import NextButton from "../assets/NextButton";
import ControlMusicButton from "../assets/ControlMusicButton";

const SelectDifficulty = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("easy");
  const easyRef = useRef(null);
  const mediumRef = useRef(null);
  const hardRef = useRef(null);
  const diffTitle = useRef(null);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(true);
    if (localStorage.getItem("difficulty") === null) {
      localStorage.setItem("difficulty", "easy");
    }
  }, []);
  // Function to handle the difficulty selection
  const handleSelectDifficulty = (difficulty) => {
    // Navigate to the route for the selected difficulty
    // navigate(`/single-player/difficulty/${difficulty}/game`);
    easyRef.current.classList.remove("active");
    mediumRef.current.classList.remove("active");
    hardRef.current.classList.remove("active");
    diffTitle.current.classList.remove("easy");
    diffTitle.current.classList.remove("medium");
    diffTitle.current.classList.remove("hard");
    if (difficulty === "easy") {
      easyRef.current.classList.add("active");
      diffTitle.current.classList.add("easy");
    } else if (difficulty === "medium") {
      mediumRef.current.classList.add("active");
      diffTitle.current.classList.add("medium");
    } else if (difficulty === "hard") {
      hardRef.current.classList.add("active");
      diffTitle.current.classList.add("hard");
    }
    setDifficulty(difficulty);
    console.log("Selected", difficulty);
  };

  return (
    <>
      <section className="select-difficulty-section">
        <div className="return-btn">
          <BackButton link={"/single-player"} />
          <ControlMusicButton />
        </div>
        <div
          className={`box select-difficulty-section ${
            isActive ? "active" : ""
          }`}
        >
          <h1 className="player-header">Select Difficulty</h1>
          <h4 className="difficulty-title" ref={diffTitle}>
            {difficulty === "hard"
              ? "IMPOSSIBLE"
              : difficulty
              ? difficulty
              : "Difficulty"}
          </h4>
          <div className="select-difficulty-box">
            <div
              className="diff-div"
              ref={easyRef}
              onClick={() => handleSelectDifficulty("easy")}
            >
              <img
                width="128"
                height="128"
                src={happyIcon}
                alt="external-multiplayer-esport-itim2101-flat-itim2101"
              />
              <p className="easy-title">easy</p>
            </div>

            <div className="separator" />
            <div className="separator2" style={{ display: "none" }} />
            <div
              className="diff-div"
              onClick={() => handleSelectDifficulty("medium")}
              ref={mediumRef}
            >
              <img
                width="128"
                height="128"
                src={boringIcon}
                alt="external-multiplayer-esport-itim2101-flat-itim2101"
              />
              <p className="medium-title">Medium</p>
            </div>

            <div className="separator"></div>
            <div className="separator2" style={{ display: "none" }} />
            <div
              className="diff-div"
              onClick={() => handleSelectDifficulty("hard")}
              ref={hardRef}
            >
              <img
                width="128"
                height="128"
                src={shockedIcon}
                alt="external-multiplayer-esport-itim2101-flat-itim2101"
              />
              <p className="hard-title">Impossible</p>
            </div>
          </div>
          <NextButton link={`${difficulty}/game`} />
        </div>
      </section>
    </>
  );
};

export default SelectDifficulty;
