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
      size.width / (mazeMap[0] ? mazeMap[0].length : 1),
      size.height / (mazeMap ? mazeMap.length : 1),
    );
    setbuttonSize(_buttonSize * 0.5);
  }, [size]);

  const pressButton = () => {
    if (lastButtonClicked.isEndButton) {
      return;
    }

    if (!pressed && isStart) {
      clickButton({ x, y });
    } else if (
      !pressed &&
      ((lastButtonClicked.x === x && lastButtonClicked.y === y + 1) ||
        (lastButtonClicked.x === x && lastButtonClicked.y === y - 1) ||
        (lastButtonClicked.x === x + 1 && lastButtonClicked.y === y) ||
        (lastButtonClicked.x === x - 1 && lastButtonClicked.y === y))
    ) {
      setIncomingDirection(getDirection(lastButtonClicked));
      clickButton({ x, y });
    }
  };

  function getDirection(previousButton) {
    if (previousButton.y < y) return "left";
    if (previousButton.y > y) return "right";
    if (previousButton.x < x) return "top";
    if (previousButton.x > x) return "bottom";
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

  return (
    <div
      onClick={pressButton}
      style={{ height: buttonSize, width: buttonSize, margin: buttonSize * 0.05 }}
      className={`Button ${pressed ? "pressed " : ""}${theme.skin.toLowerCase()}`}
    >
      {isStart && <div className="start"></div>}
      {isEnd &&
        (theme.skin === THEMES.RETRO ? <img src={theme.pointImg} className="end" /> : <div className="end"></div>)}
      {incomingDirection && <div className={`line incoming ${incomingDirection}`} />}
      {incomingDirection && outgoingDirection && <div className="dot" />}
      {outgoingDirection && <div className={`line outgoing ${outgoingDirection}`} />}
    </div>
  );
}
