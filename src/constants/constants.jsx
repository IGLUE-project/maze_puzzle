export const DEFAULT_APP_SETTINGS = {
  skin: "FUTURISTIC",
  actionWhenLoadingIfSolved: true,
  message: undefined,
  backgroundImg: "images/futuristic_controlpanel_open.png",
  resetImg: "images/reset.png",
  clickAudio: "sounds/click_button.wav",
  failAudio: "sounds/wrong.wav",
  correctAudio: "sounds/correct.wav",
};

export const THEMES = {
  FUTURISTIC: "FUTURISTIC",
  STANDARD: "STANDARD",
  RETRO: "RETRO",
};

export const THEME_ASSETS = {
  [THEMES.STANDARD]: {
    backgroundImg: "images/standard_controlpanel_open.png",
    resetImg: "",
    clickAudio: "sounds/click_button.wav",
    failAudio: "sounds/wrong.wav",
    correctAudio: "sounds/correct.wav",
  },
  [THEMES.FUTURISTIC]: {
    backgroundImg: "images/futuristic_controlpanel_open.png",
    resetImg: "images/reset.png",
    clickAudio: "sounds/click_button.wav",
    failAudio: "sounds/wrong.wav",
    correctAudio: "sounds/correct.wav",
  },
  [THEMES.RETRO]: {
    backgroundImg: "images/retro-panel.png",
    pointImg: "images/start-point.png",
    resetImg: "images/reset.png",
    clickAudio: "sounds/pencil.wav",
    failAudio: "sounds/wrong.wav",
    correctAudio: "sounds/correct.wav",
  },
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath: "./images/",
};

export const MAIN_SCREEN = "MAIN_SCREEN";
