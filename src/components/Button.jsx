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


  let marginValue;
  switch (theme.skin) {
    case "RETRO":
      console.log("es retro");
      marginValue = -1;
      break;
    case "STANDARD":
      console.log("es basico");
      marginValue = buttonSize * 0.05;
      break;
    case "FUTURISTIC":
      console.log("es futurista");
      marginValue = buttonSize * 0.01;
      break;
  };
  return (
    <div
      onClick={pressButton}
      style={{ height: buttonSize, width: buttonSize, margin: marginValue}}
      className={`Button ${pressed ? "pressed " : ""}${theme.skin.toLowerCase()}`}
    >
      {isStart && <div className="start">
        <p
          className={`text-instr text-start ${theme?.skin.toLowerCase()} `}
          style={{ position: "absolute", top: buttonSize * -0.23, left: buttonSize * 0.1, fontSize: buttonSize * 0.25 }}
        >start</p>
      </div>}
      {isEnd &&
        (theme.skin === THEMES.RETRO ? <>
          <img src={theme.pointImg} className="end">
          </img>

          <p
            className={`text-instr text-start ${theme?.skin.toLowerCase()} `}
            style={{ position: "absolute", top: buttonSize * 0.38, left: buttonSize * 0.25, fontSize: buttonSize * 0.25 }}
          >end</p>

        </> :
          <div className="end">
            <p
              className={`text-instr text-start ${theme?.skin.toLowerCase()} `}
              style={{ position: "absolute", top: buttonSize * 0.38, left: buttonSize * 0.25, fontSize: buttonSize * 0.25 }}
            >end</p>
          </div>)}
      {incomingDirection && <div className={`line incoming ${incomingDirection}`} />}
      {incomingDirection && outgoingDirection && <div className="dot" />}
      {outgoingDirection && <div className={`line outgoing ${outgoingDirection}`} />}
    </div>
  );
}
