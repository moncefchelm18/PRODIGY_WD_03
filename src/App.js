import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import MainMenu from "./Components/MainMenu";
import SelectXOSinglePlayer from "./Components/SelectXOSinglePlayer";
import SelectDifficulty from "./Components/SelectDifficulty";
import Game from "./Components/Game";
import SelectXOMultiPlayer from "./Components/SelectXOMultiPlayer";
import { useParams } from "react-router-dom";
import MusicPlayer from "./Components/MusicPlayer";
import { MusicProvider } from "./context/MusicContext";
import { useEffect } from "react";
const PlayOption = () => {
  const { "play-option": playOption } = useParams();

  // Conditionally render the component based on the play-option
  return playOption === "single-player" ? (
    <SelectXOSinglePlayer />
  ) : playOption === "multi-player" ? (
    <SelectXOMultiPlayer />
  ) : (
    <Navigate to="/" />
  );
};

function App() {
  useEffect(() => {
    localStorage.setItem("player1", "X");
    localStorage.setItem("player2", "O");
    localStorage.setItem("player", "X");
    localStorage.setItem("computer", "O");
  }, []);
  return (
    <MusicProvider>
      <Router>
        {/* <MusicPlayer /> */}
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/:play-option" element={<PlayOption />} />
          <Route
            path="/:play-option/difficulty"
            element={<SelectDifficulty />}
          />
          <Route
            path="/:play-option/difficulty/:difficulty/game"
            element={<Game />}
          />
          <Route path="/:play-option" element={<PlayOption />} />
          <Route path="/:play-option/game" element={<Game />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </MusicProvider>
  );
}

export default App;
