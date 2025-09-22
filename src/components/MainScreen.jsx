import Maze from "./Maze";
import "./../assets/scss/MainScreen.scss";
import { useEffect, useState } from "react";

export default function MainScreen({ maze, lastButtonClicked, clickButton, resetButton, mazeMap, show, config }) {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const boxShadowHover = `
    0 0 0 ${size.width * 0.007 * 0.8}px #b1b6c9,
    0 0 0 ${size.width * 0.01 * 0.8}px #1c2233,
    0 0 0 ${size.width * 0.017 * 0.8}px #b1b6c9,
    0 0 0 ${size.width * 0.02 * 0.8}px #1c2233
  `;
  const boxShadowActive = `
    0 0 0 ${size.width * 0.015 * 0.8}px #b1b6c9,
    0 0 0 ${size.width * 0.018 * 0.8}px #1c2233,
    0 0 0 ${size.width * 0.017 * 0.8}px #b1b6c9,
    0 0 0 ${size.width * 0.02 * 0.8}px #1c2233
  `;
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
      className={` ${config?.skin}`}
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
          />
          <div className="background"></div>
        </div>
        {config?.resetImg ? (
          <img src={config?.resetImg} draggable={false} className="reset" onClick={reset} />
        ) : (
          <div
            className="button-reset"
            onClick={reset}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
              setHovered(false);
              setActive(false);
            }}
            onMouseDown={() => setActive(true)}
            onMouseUp={() => setActive(false)}
            style={{
              width: size.width * 0.07,
              height: size.width * 0.07,
              marginLeft: -size.width * 0.035,
              boxShadow: active ? boxShadowActive : hovered ? boxShadowHover : undefined,
              borderColor: hovered ? "#b1b6c9" : "#1c2233",
            }}
          >
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
