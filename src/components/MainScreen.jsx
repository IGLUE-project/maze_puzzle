import Maze from "./Maze";
import "./../assets/scss/MainScreen.scss";
import { useEffect, useState } from "react";

export default function MainScreen({ maze, lastButtonClicked, clickButton, resetButton, mazeMap, config }) {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const aspectRatio = 16 / 9;
      let width = windowWidth;
      let height = width / aspectRatio;

      if (height > windowHeight) {
        height = windowHeight;
        width = height * aspectRatio;
      }
      setSize({ width, height });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ClickButton = (button) => {
    clickButton(button);
    document.getElementById("audio_click").play();
  };

  const reset = () => {
    resetButton();
  };

  return (
    <div
      id="MainScreen"
      className={` ${config?.skin.toLowerCase()} ${config?.skin.toLowerCase()}-feedback`}
      style={{ width: size.width, height: size.height, position: "absolute" }}
    >
      <audio id="audio_click" src={config.clickAudio} autostart="false" preload="auto" />
      <div
        className={`${config?.backgroundImg ? "image" : "frame"}`}
        style={{ width: size.width, height: size.height }}
      >
        <div className="border-frame">
          <Maze
            maze={maze}
            lastButtonClicked={lastButtonClicked}
            clickButton={ClickButton}
            mazeMap={mazeMap}
            theme={config}
            size={size}
          />
          <div className="background"></div>
        </div>
        {config?.resetImg ? (
          <img src={config?.resetImg} draggable={false} className="reset" onClick={reset} />
        ) : (
          <div className="button-reset" onClick={reset}>
            <div className="label" style={{ fontSize: size.width * 0.015 + "px" }}>
              Reset
            </div>
          </div>
        )}
        <img
          className="keypad"
          src={config?.backgroundImg}
          alt=""
          draggable={false}
          style={{ width: size.width, height: size.height }}
        />
      </div>
    </div>
  );
}
