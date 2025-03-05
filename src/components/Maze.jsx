import Button from "./Button";
import "./Maze.scss";

export default function Maze({ maze, lastButtonClicked, clickButton, mazeMap }) {
  return (
    <div className="Maze">
      {Array.from({ length: maze.size.x }).map((_, x) => (
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
            />
          ))}
        </div>
      ))}
    </div>
  );
}
