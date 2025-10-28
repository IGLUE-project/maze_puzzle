import { flagIcon } from "../icons/mazeIcons";

export const DEFAULT_APP_SETTINGS = {
  skin: "FUTURISTIC",
  actionWhenLoadingIfSolved: true,
  message: undefined,
  backgroundImg: "",
  resetImg: "",
  clickAudio: "sounds/click_button.wav",
  failAudio: "sounds/wrong.wav",
  correctAudio: "sounds/correct.wav",
  mazePaddingTop: "0%",
  mazePaddingBottom: "0%",
  mazePaddingLeft: "0%",
  mazePaddingRight: "0%",
  showStart: true,
  showEnd: true,
};

export const THEMES = {
  FUTURISTIC: "FUTURISTIC",
  STANDARD: "STANDARD",
  RETRO: "RETRO",
  TABLET: "TABLET",
};

export const THEME_ASSETS = {
  [THEMES.TABLET]: {
    backgroundImg: "images/tablet_bg.png",
    containerImg: "images/tablet_container.png",
    pointImg: () => flagIcon({ color: "#002a77" }),
    resetImg: "",
    clickAudio: "sounds/click_button.wav",
    failAudio: "sounds/wrong.wav",
    resetAudio: "sounds/reset.wav",
    correctAudio: "sounds/correct.wav",
    mazePaddingTop: "0%",
    mazePaddingBottom: "0%",
    mazePaddingLeft: "0%",
    mazePaddingRight: "0%",
  },
  [THEMES.FUTURISTIC]: {
    backgroundImg: "images/futuristic_bg.png",
    containerImg: "images/futuristic_container.png",
    pointImg: () => flagIcon({ color: "#6100ac" }),
    resetImg: "images/futuristic_reset.png",
    clickAudio: "sounds/click_button.wav",
    failAudio: "sounds/wrong.wav",
    resetAudio: "sounds/reset.wav",
    correctAudio: "sounds/correct.wav",
    mazePaddingTop: "0%",
    mazePaddingBottom: "0%",
    mazePaddingLeft: "0%",
    mazePaddingRight: "0%",
  },
  [THEMES.RETRO]: {
    backgroundImg: "images/retro_bg.png",
    mazeBgImg: "images/retro_container.png",
    pointImg: "images/start-point.png",
    resetImg: "images/retro_reset.png",
    clickAudio: "sounds/pencil.wav",
    failAudio: "sounds/wrong.wav",
    resetAudio: "sounds/reset.wav",
    correctAudio: "sounds/correct.wav",
    mazePaddingTop: "7%",
    mazePaddingBottom: "4%",
    mazePaddingLeft: "10%",
    mazePaddingRight: "10%",
  },
  [THEMES.STANDARD]: {
    mazeBgImg: "",
    pointImg: () => flagIcon({ color: "#00ac2bff" }),
    clickAudio: "sounds/click_button.wav",
    failAudio: "sounds/wrong.wav",
    resetAudio: "sounds/reset.wav",
    correctAudio: "sounds/correct.wav",
    mazePaddingTop: "0%",
    mazePaddingBottom: "0%",
    mazePaddingLeft: "0%",
    mazePaddingRight: "0%",
  },
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath: "./images/",
};

export const MAIN_SCREEN = "MAIN_SCREEN";
