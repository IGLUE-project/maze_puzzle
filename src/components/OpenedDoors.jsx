import React from "react";
import "./../assets/scss/OpenedDoors.scss";

const OpenedDoors = ({ show, config }) => {
  return (
    <div id="OpenedDoors" className={"screen_wrapper" + (show ? "" : " screen_hidden")}>
      <div
        className="background"
        style={config.theme?.openbackgroundImg ? { backgroundImage: `url(${config.theme?.openbackgroundImg})` } : {}}
      >
        <img className="keypad" src={config.theme?.keypadImg} alt="" />
        <div className="doors"></div>
      </div>
    </div>
  );
};

export default OpenedDoors;
