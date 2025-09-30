import "./../assets/scss/Maze.scss";
import Button from "./Button";
import MessageScreen from "./MessageScreen";

export default function Maze({ lastButtonClicked, clickButton, mazeMap, theme, size, sendSolution }) {
  return (
    <>
      <div className="Maze">
        {theme &&
          Array.from({ length: theme.mazeHeight }).map((_, y) => (
            <div className="row" key={y}>
              {Array.from({ length: theme.mazeWidth }).map((_, x) => (
                <Button
                  key={x + " " + y}
                  isStart={x + 1 === theme.startPoint.x && y + 1 === theme.startPoint.y}
                  isEnd={x + 1 === theme.endPoint.x && y + 1 === theme.endPoint.y}
                  x={x}
                  y={y}
                  lastButtonClicked={lastButtonClicked}
                  clickButton={clickButton}
                  mazeMap={mazeMap}
                  theme={theme}
                  size={size}
                />
              ))}
            </div>
          ))}
      </div>

      <div className="victory">
        <MessageScreen sendSolution={sendSolution} />
      </div>
    </>
  );
}
