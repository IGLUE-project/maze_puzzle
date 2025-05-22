import Maze from "./Maze";
import "./../assets/scss/MainScreen.scss";

export default function MainScreen({ maze, lastButtonClicked, clickButton, resetButton, mazeMap, show, config }) {
  const ClickButton = (button) => {
    clickButton(button);
    document.getElementById("audio_click").play();
  };

  const reset = () => {
    resetButton();
    document.getElementById("audio_reset").play();
  };

  return (
    <div id="MainScreen" className={`screen_wrapper${show ? "" : " screen_hidden"} ${config.theme?.name}`}>
      <audio id="audio_click" src="sounds/click_button.wav" autostart="false" preload="auto" />
      <audio id="audio_reset" src="sounds/reset.wav" autostart="false" preload="auto" />
      <div className={`${config.theme?.openKeypadImg ? "image" : "frame"}`}>
        <div className="border-frame">
          <Maze
            maze={maze}
            lastButtonClicked={lastButtonClicked}
            clickButton={ClickButton}
            mazeMap={mazeMap}
            theme={config.theme}
          />
          <div className="background"></div>
        </div>
        {config.theme?.resetImg ? (
          <img src={config.theme?.resetImg} className="reset" onClick={reset} />
        ) : (
          <div className="button-reset" onClick={reset}>
            <div className="label">Reset</div>
          </div>
        )}
        <img className="keypad" src={config.theme?.openKeypadImg} alt="" draggable={false} />
      </div>
    </div>
  );
}
