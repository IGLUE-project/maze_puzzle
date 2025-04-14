import React from "react";
import "./../assets/scss/Doors.scss";
import { KEYPAD_SCREEN } from "../constants/constants";

const OpenedDoors = ({ show, onOpenScreen }) => {
  return (
    <div id="OpenedDoors" className={"screen_wrapper" + (show ? "" : " screen_hidden")}>
      <div className="panel" onClick={() => onOpenScreen(KEYPAD_SCREEN)}>
        <div className="top-box">
          <div className="inner-box"></div>
        </div>
        <div className="middle-bar"></div>
        <div className="bottom-box"></div>
      </div>
    </div>
  );
};

export default OpenedDoors;
