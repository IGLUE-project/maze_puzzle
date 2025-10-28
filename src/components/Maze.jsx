import { THEMES } from "../constants/constants";
import "./../assets/scss/Maze.scss";
import Button from "./Button";
import MessageScreen from "./MessageScreen";

export default function Maze({ lastButtonClicked, clickButton, mazeMap, theme, size, sendSolution }) {
  const hasBg = !!theme?.mazeBgImg;

  const style = hasBg
    ? {
        backgroundImage: `url(${theme.mazeBgImg})`,
        width: size.width * 0.75,
        height: size.height * 0.75,
        padding: `${theme.mazePaddingTop} ${theme.mazePaddingRight} ${theme.mazePaddingBottom} ${theme.mazePaddingLeft}`,
      }
    : {};

  return (
    <>
      <div
        className={`Maze ${hasBg ? "BgImg" : ""}`}
        style={{
          ...style,
          marginTop: theme.skin === THEMES.TABLET || theme.skin === THEMES.STANDARD ? "4%" : 0,
          marginRight: theme.skin === THEMES.FUTURISTIC ? "6%" : 0,
        }}
      >
        {theme &&
          Array.from({ length: theme.mazeHeight }).map((_, y) => (
            <div className="row" key={y} style={{ zIndex: "150" }}>
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
