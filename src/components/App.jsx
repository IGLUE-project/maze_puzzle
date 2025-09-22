import React, { useEffect, useState } from "react";
import "./../assets/scss/app.scss";
import "./../assets/scss/modal.scss";

import { GLOBAL_CONFIG } from "../config/config.js";
import * as I18n from "../vendors/I18n.js";
import * as LocalStorage from "../vendors/Storage.js";

import { KEYPAD_SCREEN, THEMES, THEME_ASSETS } from "../constants/constants.jsx";
import MainScreen from "./MainScreen.jsx";

let escapp;

let solutionPath = [];
const initialConfig = {
  maze: {
    start: { x: 0, y: 0 },
    end: { x: 3, y: 7 },
    size: { x: 4, y: 8 },
  },
  config: {
    theme: THEMES.FUTURISTIC,
  },
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(KEYPAD_SCREEN);
  const [lastButtonClicked, setLastButtonClicked] = useState({});
  const [mazeMap, setMazeMap] = useState([]);
  const [failClass, setFailClass] = useState("");
  const [config, setConfig] = useState({});

  useEffect(() => {
    console.log("useEffect, lets load everything");
    // localStorage.clear(); //For development, clear local storage (comentar y descomentar para desarrollo)
    I18n.init(GLOBAL_CONFIG);
    LocalStorage.init(GLOBAL_CONFIG.localStorageKey);
    GLOBAL_CONFIG.escapp.onNewErStateCallback = (er_state) => {
      console.log("New ER state received from ESCAPP", er_state);
      restoreState(er_state);
    };
    GLOBAL_CONFIG.escapp.onErRestartCallback = (er_state) => {
      // reset(); //For development
      console.log("Escape Room Restart received from ESCAPP", er_state);
      LocalStorage.removeSetting("app_state");
      LocalStorage.removeSetting("played_door");
    };
    escapp = new ESCAPP(GLOBAL_CONFIG.escapp);
    // escapp.validate((success, er_state) => {
    //   console.log("ESCAPP validation", success, er_state);
    //   try {
    //     if (success) {
    //       //ha ido bien, restauramos el estado recibido
    //       restoreState(er_state);
    //     }
    //   } catch (e) {
    //     console.error(e);
    //   }
    // });

    setLoading(false);
    loadConfiguration(initialConfig);
  }, []);

  function parseSolution(solutionPath) {
    return solutionPath.map((step) => `${step.x + 1},${step.y + 1}`).join(";");
  }

  function loadConfiguration({ config, maze }) {
    let configuration = {
      theme: {
        name: config.theme,
        ...(THEME_ASSETS[config.theme] || {}),
      },
      maze,
    };
    setConfig(configuration);
    generateMazeMap(maze);
  }

  function solvePuzzle() {
    let solutionstr = parseSolution(solutionPath);

    console.log("Solving puzzle", solutionstr);
    const failAudio = document.getElementById("audio_failure");
    const correctAudio = document.getElementById("audio_correct");

    escapp.submitPuzzle(GLOBAL_CONFIG.escapp.puzzleId, solutionstr, {}, (success) => {
      if (!success) {
        failAudio.play();
        setFailClass("fail");
        setTimeout(() => {
          setFailClass("");
          resetButton();
        }, 700);
      } else {
        correctAudio.play();
        setFailClass("correct");
      }
    });
  }

  function restoreState(er_state) {
    console.log("Restoring state", er_state);
    if (typeof er_state !== "undefined" && er_state.puzzlesSolved.length > 0) {
      let lastPuzzleSolved = Math.max.apply(null, er_state.puzzlesSolved);
      if (lastPuzzleSolved >= GLOBAL_CONFIG.escapp.puzzleId) {
        //puzzle superado, abrimos la caja fuerte
      } else {
        //puzzle no superado, miramos en localStorage en qué pantalla estábamos
        let localstateToRestore = LocalStorage.getSetting("app_state");
        console.log("Restoring screen from local state", localstateToRestore);
        if (localstateToRestore) {
          setScreen(localstateToRestore.screen);
        }
      }
      setLoading(false);
    } else {
      restoreLocalState();
    }
  }

  function saveState() {
    console.log("Saving state to local storage");
    let currentState = { screen: screen, prevScreen: prevScreen };
    LocalStorage.saveSetting("app_state", currentState);
  }

  function restoreLocalState() {
    let stateToRestore = LocalStorage.getSetting("app_state");
    console.log("Restoring local state", stateToRestore);
    if (stateToRestore) {
      setScreen(stateToRestore.screen);
      setLoading(false);
    }
  }

  function onOpenScreen(newscreen_name) {
    console.log("Opening screen", newscreen_name);
    setScreen(newscreen_name);
    saveState();
  }

  const clickButton = (button) => {
    console.log("Button clicked", button);
    solutionPath.push(button);
    mazeMap[button.x][button.y] = true;
    setMazeMap([...mazeMap]);
    let isEndButton = false;
    if (button.x === config.maze.end.x && button.y === config.maze.end.y) {
      solvePuzzle();
      isEndButton = true;
    }
    setLastButtonClicked({ ...button, isEndButton });
  };

  const resetButton = () => {
    console.log("Reset button clicked");
    if (solutionPath.length > 0) {
      document.getElementById("audio_reset").play();
    }
    solutionPath = [];
    setLastButtonClicked({});
    generateMazeMap(config.maze);
  };

  function generateMazeMap(maze) {
    let mazeMap = [];
    for (let x = 0; x < maze.size.x; x++) {
      let row = [];
      for (let y = 0; y < maze.size.y; y++) {
        row.push(false);
      }
      mazeMap.push(row);
    }
    setMazeMap(mazeMap);
  }

  return (
    <div id="firstnode">
      <audio id="audio_failure" src="sounds/wrong.wav" autostart="false" preload="auto" />
      <audio id="audio_correct" src="sounds/correct.wav" autostart="false" preload="auto" />
      <audio id="audio_reset" src="sounds/reset.wav" autostart="false" preload="auto" />
      <div className={`main-background ${failClass}`}>
        <MainScreen
          maze={config.maze}
          lastButtonClicked={lastButtonClicked}
          clickButton={clickButton}
          resetButton={resetButton}
          mazeMap={mazeMap}
          show={screen === KEYPAD_SCREEN}
          config={config}
        />
      </div>
    </div>
  );
}
