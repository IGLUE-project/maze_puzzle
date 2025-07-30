import { useContext, useEffect, useRef, useState } from "react";
import "./../assets/scss/app.scss";

import { DEFAULT_APP_SETTINGS, ESCAPP_CLIENT_SETTINGS, MAIN_SCREEN, THEME_ASSETS } from "../constants/constants.jsx";
import MainScreen from "./MainScreen.jsx";
import { GlobalContext } from "./GlobalContext.jsx";

export default function App() {
  const { escapp, setEscapp, appSettings, setAppSettings, Storage, setStorage, Utils, I18n } = useContext(GlobalContext);
  const hasExecutedEscappValidation = useRef(false);

  const [solution, setSolution] = useState([]);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState(MAIN_SCREEN);
  const prevScreen = useRef(screen);
  const [solved, setSolved] = useState(false);

  const [lastButtonClicked, setLastButtonClicked] = useState({});
  const [mazeMap, setMazeMap] = useState([]);
  const [failClass, setFailClass] = useState("");

  useEffect(() => {
    //Init Escapp client
    if (escapp !== null) {
      return;
    }
    //Create the Escapp client instance.
    let _escapp = new ESCAPP(ESCAPP_CLIENT_SETTINGS);
    setEscapp(_escapp);
    Utils.log("Escapp client initiated with settings:", _escapp.getSettings());

    //Use the storage feature provided by Escapp client.
    setStorage(_escapp.getStorage());

    //Get app settings provided by the Escapp server.
    let _appSettings = processAppSettings(_escapp.getAppSettings());
    setAppSettings(_appSettings);
  }, []);

  useEffect(() => {
    if (!hasExecutedEscappValidation.current && escapp !== null && appSettings !== null && Storage !== null) {
      hasExecutedEscappValidation.current = true;

      //Register callbacks in Escapp client and validate user.
      escapp.registerCallback("onNewErStateCallback", function (erState) {
        try {
          Utils.log("New escape room state received from ESCAPP", erState);
          restoreAppState(erState);
        } catch (e) {
          Utils.log("Error in onNewErStateCallback", e);
        }
      });

      escapp.registerCallback("onErRestartCallback", function (erState) {
        try {
          Utils.log("Escape Room has been restarted.", erState);
          if (typeof Storage !== "undefined") {
            Storage.removeSetting("state");
          }
        } catch (e) {
          Utils.log("Error in onErRestartCallback", e);
        }
      });

      //Validate user. To be valid, a user must be authenticated and a participant of the escape room.
      escapp.validate((success, erState) => {
        try {
          Utils.log("ESCAPP validation", success, erState);
          if (success) {
            restoreAppState(erState);
            setLoading(false);
          }
        } catch (e) {
          Utils.log("Error in validate callback", e);
        }
      });
    }
  }, [escapp, appSettings, Storage]);

  useEffect(() => {
    if (screen !== prevScreen.current) {
      Utils.log("Screen ha cambiado de", prevScreen.current, "a", screen);
      prevScreen.current = screen;
    }
  }, [screen]);

  function restoreAppState(erState) {
    Utils.log("Restore application state based on escape room state:", erState);
    const _settings = escapp.getSettings();

    if (!_settings.linkedPuzzleIds || _settings.linkedPuzzleIds.length === 0) {
      setAppSettings((prevSettings) => {
        return {
          ...prevSettings,
          disableButton: true,
        };
      });
    }
  }

  function processAppSettings(_appSettings) {
    if (typeof _appSettings !== "object") {
      _appSettings = {};
    }
    if (typeof _appSettings.skin === "undefined" && typeof DEFAULT_APP_SETTINGS.skin === "string") {
      _appSettings.skin = DEFAULT_APP_SETTINGS.skin;
    }

    let skinSettings = THEME_ASSETS[_appSettings.skin] || {};

    let DEFAULT_APP_SETTINGS_SKIN = Utils.deepMerge(DEFAULT_APP_SETTINGS, skinSettings);

    // Merge _appSettings with DEFAULT_APP_SETTINGS_SKIN to obtain final app settings
    _appSettings = Utils.deepMerge(DEFAULT_APP_SETTINGS_SKIN, _appSettings);

    generateMazeMap(_appSettings.maze);

    //Init internacionalization module
    I18n.init(_appSettings);

    if (typeof _appSettings.message !== "string") {
      _appSettings.message = I18n.getTrans("i.message");
    }

    //Change HTTP protocol to HTTPs in URLs if necessary
    _appSettings = Utils.checkUrlProtocols(_appSettings);

    //Preload resources (if necessary)
    Utils.preloadImages([_appSettings.backgroundMessage]);
    //Utils.preloadAudios([_appSettings.soundBeep,_appSettings.soundNok,_appSettings.soundOk]); //Preload done through HTML audio tags
    //Utils.preloadVideos(["videos/some_video.mp4"]);
    Utils.log("App settings:", _appSettings);
    return _appSettings;
  }

  function parseSolution(_solutionPath) {
    return _solutionPath.map((step) => `${step.x + 1},${step.y + 1}`).join(";");
  }

  function solvePuzzle() {
    let parsedSolution = parseSolution(solution);

    Utils.log("solution: ", parsedSolution);

    setSolution([]);

    return checkResult(parsedSolution);
  }

  function checkResult(_solution) {
    const failAudio = document.getElementById("audio_failure");
    const correctAudio = document.getElementById("audio_correct");
    escapp.checkNextPuzzle(_solution, {}, (success, erState) => {
      Utils.log("Check solution Escapp response", success, erState);
      if (success) {
        setSolved(true);
        correctAudio.play();
        setFailClass("correct");
        try {
          setTimeout(() => {
            submitPuzzleSolution(_solution);
          }, 2000);
        } catch (e) {
          Utils.log("Error in checkNextPuzzle", e);
        }
      } else {
        failAudio.play();
        setFailClass("fail");
        setTimeout(() => {
          setFailClass("");
          resetButton();
        }, 700);
      }
    });
  }
  function submitPuzzleSolution(_solution) {
    Utils.log("Submit puzzle solution", _solution);
    escapp.submitNextPuzzle(_solution, {}, (success, erState) => {
      Utils.log("Solution submitted to Escapp", _solution, success, erState);
    });
  }

  const clickButton = (button) => {
    const newSolution = [...solution, button];
    setSolution(newSolution);
    mazeMap[button.x][button.y] = true;
    setMazeMap([...mazeMap]);
    let isEndButton = false;
    if (button.x === appSettings.maze.end.x && button.y === appSettings.maze.end.y) {
      solvePuzzle();
      isEndButton = true;
    }
    setLastButtonClicked({ ...button, isEndButton });
  };

  const resetButton = () => {
    if (solution.length > 0) {
      document.getElementById("audio_reset").play();
    }
    setSolution([]);
    setLastButtonClicked({});
    generateMazeMap(appSettings.maze);
  };

  function generateMazeMap(maze) {
    let _mazeMap = [];
    for (let x = 0; x < maze.size.x; x++) {
      let row = [];
      for (let y = 0; y < maze.size.y; y++) {
        row.push(false);
      }
      _mazeMap.push(row);
    }
    setMazeMap(_mazeMap);
  }

  const renderScreens = (screens) => {
    if (loading === true) {
      return null;
    } else {
      return <>{screens.map(({ id, content }) => renderScreen(id, content))}</>;
    }
  };

  const renderScreen = (screenId, screenContent) => (
    <div key={screenId} className={`screen_wrapper ${screen === screenId ? "active" : ""}`}>
      {screenContent}
    </div>
  );

  let screens = [
    {
      id: MAIN_SCREEN,
      content: (
        <div className={`main-background ${failClass}`}>
          <audio id="audio_failure" src="sounds/wrong.wav" autostart="false" preload="auto" />
          <audio id="audio_correct" src="sounds/correct.wav" autostart="false" preload="auto" />
          <audio id="audio_reset" src="sounds/reset.wav" autostart="false" preload="auto" />

          <MainScreen
            maze={appSettings?.maze}
            lastButtonClicked={lastButtonClicked}
            clickButton={clickButton}
            resetButton={resetButton}
            mazeMap={mazeMap}
            config={appSettings}
          />
        </div>
      ),
    },
  ];

  return (
    <div
      id="global_wrapper"
      className={`${appSettings !== null && typeof appSettings.skin === "string" ? appSettings.skin.toLowerCase() : ""}`}
    >
      {renderScreens(screens)}
    </div>
  );
}
