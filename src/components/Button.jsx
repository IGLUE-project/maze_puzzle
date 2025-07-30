import { useEffect, useRef, useState } from "react";
import "./../assets/scss/Button.scss";

export default function Button({ isStart, isEnd, x, y, lastButtonClicked, clickButton, mazeMap, theme }) {
  const [pressed, setPressed] = useState(false);
  const [incomingDirection, setIncomingDirection] = useState("");
  const [outgoingDirection, setOutgoingDirection] = useState("");

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
    <div onClick={pressButton} className={`Button ${pressed ? "pressed " : ""}${theme.skin}`}>
      {isStart && <div className="start"></div>}
      {isEnd && <div className="end"></div>}
      {incomingDirection && <div className={`line incoming ${incomingDirection}`} />}
      {incomingDirection && outgoingDirection && <div className="dot" />}
      {outgoingDirection && <div className={`line outgoing ${outgoingDirection}`} />}
    </div>
  );
}
