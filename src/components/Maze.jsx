import Button from "./Button";
import "./../assets/scss/Maze.scss";
import { GLOBAL_CONFIG } from "../config/config.js";

export default function Maze({ maze, lastButtonClicked, clickButton, mazeMap, theme }) {
  return (
    <>
      <div className="Maze">
        {maze &&
          Array.from({ length: maze.size.x }).map((_, x) => (
            <div className="row" key={x}>
              {Array.from({ length: maze.size.y }).map((_, y) => (
                <Button
                  key={x + " " + y}
                  isStart={x === maze.start.x && y === maze.start.y}
                  isEnd={x === maze.end.x && y === maze.end.y}
                  x={x}
                  y={y}
                  lastButtonClicked={lastButtonClicked}
                  clickButton={clickButton}
                  mazeMap={mazeMap}
                  theme={theme}
                />
              ))}
            </div>
          ))}
      </div>
      <div className="victory">
        <div>
          <h2>{GLOBAL_CONFIG.message}</h2>
        </div>
      </div>
    </>
  );
}
