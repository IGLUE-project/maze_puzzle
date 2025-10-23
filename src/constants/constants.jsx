export const DEFAULT_APP_SETTINGS = {
  skin: "FUTURISTIC",
  actionWhenLoadingIfSolved: true,
  message: undefined,
  backgroundImg: "",
  resetImg: "",
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
    backgroundImg: "images/standard_bg.png",
    containerImg: "images/standard_container.png",
    resetImg: "",
    clickAudio: "sounds/click_button.wav",
    failAudio: "sounds/wrong.wav",
    resetAudio: "sounds/reset.wav",
    correctAudio: "sounds/correct.wav",
  },
  [THEMES.FUTURISTIC]: {
    backgroundImg: "images/futuristic_bg.png",
    containerImg: "images/futuristic_container.png",
    resetImg: "images/futuristic_reset.png",
    clickAudio: "sounds/click_button.wav",
    failAudio: "sounds/wrong.wav",
    resetAudio: "sounds/reset.wav",
    correctAudio: "sounds/correct.wav",
  },
  [THEMES.RETRO]: {
    backgroundImg: "images/retro_bg.png",
    containerImg: "images/retro_container.png",
    pointImg: "images/start-point.png",
    resetImg: "images/retro_reset.png",
    clickAudio: "sounds/pencil.wav",
    failAudio: "sounds/wrong.wav",
    resetAudio: "sounds/reset.wav",
    correctAudio: "sounds/correct.wav",
  },
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath: "./images/",
};

export const MAIN_SCREEN = "MAIN_SCREEN";
