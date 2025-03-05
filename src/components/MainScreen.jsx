import Maze from "./Maze";
import "./MainScreen.scss";

export default function MainScreen({ maze, lastButtonClicked, clickButton, resetButton, mazeMap, show }) {
  return (
    <div id="MainScreen" className={"screen_wrapper" + (show ? "" : " screen_hidden")} style={{}}>
      <div className="frame">
        <div className="border-frame">
          <Maze
            className="inner-frame"
            maze={maze}
            lastButtonClicked={lastButtonClicked}
            clickButton={clickButton}
            mazeMap={mazeMap}
          />
          <img
            src="/src/components/pngegg.png"
            className="reset"
            onClick={resetButton}
            style={{
              width: "100px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </div>
        <div className="bar"></div>
      </div>
    </div>
  );
}
