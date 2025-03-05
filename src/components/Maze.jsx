import Button from "./Button";

export default function Maze({ maze, lastButtonClicked, clickButton, mazeMap }) {
  return (
    <div
      className="Maze"
      style={{
        height: "95%",
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Array.from({ length: maze.size.x }).map((_, x) => (
        <div key={x} style={{ display: "flex", height: "100%", width: "100%" }}>
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
