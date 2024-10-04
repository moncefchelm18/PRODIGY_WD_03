import React, { useEffect, useRef } from "react";
import backgroundMusic from "../assets/music/bgmusic.mp3"; // Update the path to your audio file

const MusicPlayer = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.play().catch((error) => {
      console.error("Failed to play audio:", error);
    });

    // Cleanup to stop music when component unmounts
    return () => {
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src={backgroundMusic} type="audio/mp3" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default MusicPlayer;
