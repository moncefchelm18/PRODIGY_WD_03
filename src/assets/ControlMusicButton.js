import React, { useContext } from "react";
import musicOnIcon from "../assets/icons8-audio-64.png";
import musicOffIcon from "../assets/icons8-mute-64.png";
import { MusicContext } from "../context/MusicContext";
import "../styles/ControlMusicButton.css";

const ControlMusicButton = () => {
  const { isPlaying, toggleMusic } = useContext(MusicContext);

  return (
    <button onClick={toggleMusic} className="control-music-button">
      <img
        src={isPlaying ? musicOnIcon : musicOffIcon} // Show muted icon initially
        alt={isPlaying ? "Pause Music" : "Play Music"}
        width={32}
        height={32}
      />
    </button>
  );
};

export default ControlMusicButton;
