import Maze from "./Maze";
import "./../assets/scss/MainScreen.scss";

export default function MainScreen({ maze, lastButtonClicked, clickButton, resetButton, mazeMap, show, config }) {
  const ClickButton = (button) => {
    clickButton(button);
    const clickAudio = document.getElementById("audio_click");
    clickAudio.play();
  };

  return (
    <div id="MainScreen" className={"screen_wrapper" + (show ? "" : " screen_hidden")}>
      <audio id="audio_click" src="sounds/click_button.wav" autostart="false" preload="auto" />
      <div className={`${config.theme?.keypadImg ? "image" : "frame"}`}>
        <div className="border-frame">
          <Maze
            className="inner-frame"
            maze={maze}
            lastButtonClicked={lastButtonClicked}
            clickButton={ClickButton}
            mazeMap={mazeMap}
          />
          <div className="background"></div>
          {/* <img src="/src/assets/images/reset.png" className="reset" onClick={resetButton} /> */}
        </div>
        <img className="keypad" src={config.theme?.openKeypadImg} alt="" />
      </div>
    </div>
  );
}
