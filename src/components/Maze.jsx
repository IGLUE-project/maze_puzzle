import "./../assets/scss/Maze.scss";
import Button from "./Button";

export default function Maze({ maze, lastButtonClicked, clickButton, mazeMap, theme, size }) {
  return (
    <>
      <div className="Maze">
        <p className={`text-instr text-start ${theme?.name} `}>start</p>
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
                  size={size}
                />
              ))}
            </div>
          ))}
        <p className={`text-instr text-end ${theme?.name} `}>end</p>
      </div>

      <div className="victory">
        <div>
          <h2>{theme.message}</h2>
        </div>
      </div>
    </>
  );
}
