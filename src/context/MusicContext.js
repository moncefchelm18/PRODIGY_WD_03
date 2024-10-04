import React, { createContext, useState, useEffect } from "react";
import bgMusic from "../assets/music/bgmusic.mp3";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false); // Start with muted (paused) state
  const [audio] = useState(() => new Audio(bgMusic)); // Initialize audio instance

  useEffect(() => {
    audio.loop = true; // Set the audio to loop

    // Try to play the music on component mount
    const startMusic = async () => {
      try {
        await audio.play();
        setIsPlaying(true); // Update to playing state if music starts successfully
        console.log("Music started playing automatically");
      } catch (error) {
        console.error(
          "Auto-play was prevented. User interaction required.",
          error
        );
      }
    };

    startMusic(); // Attempt to play the music on page load

    return () => {
      audio.pause(); // Pause the music when unmounted
    };
  }, [audio]);

  // Toggle music play/pause when the user clicks the button
  const toggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Play interrupted or prevented:", error);
      });
    }
    setIsPlaying(!isPlaying); // Toggle the state
  };

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  );
};
