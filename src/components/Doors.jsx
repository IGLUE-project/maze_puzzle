import React from "react";
import "./../assets/scss/Doors.scss";
import { KEYPAD_SCREEN } from "../constants/constants";

const Doors = ({ show, onOpenScreen, config }) => {
  return (
    <div id="Doors" className={"screen_wrapper" + (show ? "" : " screen_hidden")}>
      <div
        className="background"
        style={config.theme?.backgroundImg ? { backgroundImage: `url(${config.theme?.backgroundImg})` } : {}}
      >
        <img onClick={() => onOpenScreen(KEYPAD_SCREEN)} className="keypad" src={config.theme?.keypadImg} alt="" />
      </div>
    </div>
  );
};

export default Doors;
