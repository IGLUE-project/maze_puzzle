import { useEffect, useState } from "react";
import "./Button.scss";

export default function Button({ isStart, isEnd, x, y, lastButtonClicked, clickButton, mazeMap }) {
  const [pressed, setPressed] = useState(false);
  const [incomingDirection, setIncomingDirection] = useState(""); // Dirección de entrada
  const [outgoingDirection, setOutgoingDirection] = useState(""); // Dirección de salida

  const pressButton = () => {
    if (lastButtonClicked.isEndButton) {
      console.log("Laberinto terminado");
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
      setIncomingDirection(getDirection(lastButtonClicked)); // Marca de dónde vino
      clickButton({ x, y });
    } else {
      console.log("No puedes presionar este botón");
    }
  };

  function getDirection(previousButton) {
    if (previousButton.y < y) return "left";
    if (previousButton.y > y) return "right";
    if (previousButton.x < x) return "top";
    if (previousButton.x > x) return "bottom";
    console.error("Botón ilegal pulsado");
    return "";
  }

  useEffect(() => {
    if (mazeMap[x] && mazeMap[x][y]) {
      setPressed(true);
      if (!outgoingDirection && (lastButtonClicked.x !== x || lastButtonClicked.y !== y)) {
        setOutgoingDirection(getDirection(lastButtonClicked)); // Marca hacia dónde va
      }
    } else {
      setPressed(false);
      setIncomingDirection("");
      setOutgoingDirection("");
    }
  }, [mazeMap]);

  return (
    <div onClick={pressButton} className={`Button ${pressed ? "pressed" : ""}`}>
      {isStart && <div className="start"></div>}
      {isEnd && <div className="end"></div>}
      {incomingDirection && <div className={`line incoming ${incomingDirection}`} />}
      {outgoingDirection && <div className={`line outgoing ${outgoingDirection}`} />}
    </div>
  );
}
