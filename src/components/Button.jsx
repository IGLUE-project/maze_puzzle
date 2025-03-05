import { useEffect, useState } from "react";
import "./Button.scss";

export default function Button({ isStart, isEnd, x, y, lastButtonClicked, clickButton, mazeMap }) {
  const [pressed, setPressed] = useState(false);
  const pressButton = () => {
    if (lastButtonClicked.isEndButton) {
      console.log("laberinto terminado");
    } else if (!pressed && isStart) {
      clickButton({ x, y });
    } else if (
      !pressed &&
      ((lastButtonClicked.x === x && lastButtonClicked.y === y + 1) ||
        (lastButtonClicked.x === x && lastButtonClicked.y === y - 1) ||
        (lastButtonClicked.x === x + 1 && lastButtonClicked.y === y) ||
        (lastButtonClicked.x === x - 1 && lastButtonClicked.y === y))
    ) {
      clickButton({ x, y });
    } else {
      console.log("You can't press this button");
    }
  };

  useEffect(() => {
    mazeMap[x] && mazeMap[x][y] ? setPressed(true) : setPressed(false);
  }, [mazeMap]);
  return (
    <div onClick={(e) => pressButton()} className={`Button ${pressed ? "pressed" : ""}`}>
      {!isStart && !isEnd && (pressed ? <span>X</span> : <span>O</span>)}

      {isStart && <span>start</span>}
      {isEnd && <span>end</span>}
    </div>
  );
}
