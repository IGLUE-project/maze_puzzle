import Maze from "./Maze";
import "./../assets/scss/MainScreen.scss";

export default function MainScreen({ maze, lastButtonClicked, clickButton, resetButton, mazeMap, show }) {
  const ClickButton = (button) => {
    clickButton(button);
    const clickAudio = document.getElementById("audio_click");
    clickAudio.play();
  };

  return (
    <div id="MainScreen" className={"screen_wrapper" + (show ? "" : " screen_hidden")}>
      <audio id="audio_click" src="sounds/click_button.wav" autostart="false" preload="auto" />
      <div className="frame">
        <div className="border-frame">
          <Maze
            className="inner-frame"
            maze={maze}
            lastButtonClicked={lastButtonClicked}
            clickButton={ClickButton}
            mazeMap={mazeMap}
          />
          <img src="/src/assets/images/reset.png" className="reset" onClick={resetButton} />
        </div>
        <div className="bar"></div>
      </div>
    </div>
  );
}
