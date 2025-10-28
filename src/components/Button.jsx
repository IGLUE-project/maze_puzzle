import { useEffect, useRef, useState } from "react";
import "./../assets/scss/Button.scss";
import { THEMES } from "../constants/constants";

export default function Button({ isStart, isEnd, x, y, lastButtonClicked, clickButton, mazeMap, theme, size }) {
  const [pressed, setPressed] = useState(false);
  const [incomingDirection, setIncomingDirection] = useState("");
  const [outgoingDirection, setOutgoingDirection] = useState("");
  const [buttonSize, setbuttonSize] = useState(0);

  useEffect(() => {
    const _buttonSize = Math.min(
      size.width / (mazeMap ? mazeMap.length : 1),
      size.height / (mazeMap[0] ? mazeMap[0].length : 1),
    );
    if (theme.skin === THEMES.FUTURISTIC) setbuttonSize(_buttonSize * 0.72);
    else setbuttonSize(_buttonSize * 0.75);
  }, [size]);

  const pressButton = () => {
    if ((lastButtonClicked.isEndButton && theme.showEnd) || pressed) {
      return;
    }

    if (Object.keys(lastButtonClicked).length === 0 && (isStart || !theme.showStart)) {
      clickButton({ x, y });
    } else if (
      (lastButtonClicked.x === x && lastButtonClicked.y === y + 1) ||
      (lastButtonClicked.x === x && lastButtonClicked.y === y - 1) ||
      (lastButtonClicked.x === x + 1 && lastButtonClicked.y === y) ||
      (lastButtonClicked.x === x - 1 && lastButtonClicked.y === y)
    ) {
      setIncomingDirection(getDirection(lastButtonClicked));
      clickButton({ x, y });
    }
  };

  function getDirection(previousButton) {
    if (previousButton.x < x) return "left";
    if (previousButton.x > x) return "right";
    if (previousButton.y < y) return "top";
    if (previousButton.y > y) return "bottom";
    return "";
  }

  useEffect(() => {
    if (mazeMap[x] && mazeMap[x][y]) {
      setPressed(true);
      if (!outgoingDirection && (lastButtonClicked.x !== x || lastButtonClicked.y !== y)) {
        setOutgoingDirection(getDirection(lastButtonClicked));
      }
    } else {
      setPressed(false);
      setIncomingDirection("");
      setOutgoingDirection("");
    }
  }, [mazeMap]);

  let marginValue = -1;
  if (!theme.mazeBgImg) {
    switch (theme.skin) {
      case "RETRO":
        marginValue = buttonSize * 0.03;
        break;
      case "STANDARD":
        marginValue = buttonSize * 0.04;
        break;
      case "FUTURISTIC":
        marginValue = buttonSize * 0.001;
        break;
    }
  }
  return (
    <div
      onClick={pressButton}
      style={{
        height: buttonSize,
        width: buttonSize,
        margin: marginValue,
        opacity: theme.skin === THEMES.FUTURISTIC && theme.mazeBgImg ? 0.7 : 1,
      }}
      className={`Button ${pressed ? "pressed " : ""}${theme.skin.toLowerCase()}`}
    >
      {isStart && theme.showStart && (
        <div className="start">
          <p
            style={{
              position: "absolute",
              top: buttonSize * -0.23,
              left: buttonSize * 0.1,
              fontSize: buttonSize * 0.25,
            }}
          ></p>
        </div>
      )}
      {isEnd && theme.showEnd && (
        <>
          {typeof theme.pointImg === "function" ? (
            <div className="end">{theme.pointImg()} </div>
          ) : (
            <img src={theme.pointImg} className="end" />
          )}

          <p
            style={{
              position: "absolute",
              top: buttonSize * 0.38,
              left: buttonSize * 0.25,
              fontSize: buttonSize * 0.25,
            }}
          ></p>
        </>
      )}
      {incomingDirection && <div className={`line incoming ${incomingDirection}`} />}
      {!incomingDirection && pressed && !theme.showStart && (
        <div className="start">
          <p
            style={{
              position: "absolute",
              top: buttonSize * -0.23,
              left: buttonSize * 0.1,
              fontSize: buttonSize * 0.25,
            }}
          ></p>
        </div>
      )}
      {incomingDirection && outgoingDirection && <div className="dot" />}
      {outgoingDirection && <div className={`line outgoing ${outgoingDirection}`} />}
    </div>
  );
}
