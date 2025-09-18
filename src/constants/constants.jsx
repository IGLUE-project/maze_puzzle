export const DOORS_SCREEN = "doors";
export const DOORS_OPENED_SCREEN = "doors_opened";
export const KEYPAD_SCREEN = "keypad";

export const THEMES = {
  BASIC: "basic",
  FUTURISTIC: "futuristic",
  CONTEMPORARY: "contemporary",
  ANCIENT: "ancient",
};

export const THEME_ASSETS = {
  [THEMES.ANCIENT]: {
    openKeypadImg: "/src/assets/images/retro_controlpanel_open.png",
    resetImg: "/src/assets/images/reset.png",
    clickAudio: "sounds/click_button.wav",
    failAudio: "sounds/wrong.wav",
    correctAudio: "sounds/correct.wav",
  },
  [THEMES.BASIC]: {
    openKeypadImg: "/src/assets/images/basic_controlpanel_open.png",
    resetImg: "",
    clickAudio: "sounds/click_button.wav",
    failAudio: "sounds/wrong.wav",
    correctAudio: "sounds/correct.wav",
  },
  [THEMES.CONTEMPORARY]: {
    openKeypadImg: "/src/assets/images/contemporary_controlpanel_open.png",
    resetImg: "",
    clickAudio: "sounds/click_button.wav",
    failAudio: "sounds/wrong.wav",
    correctAudio: "sounds/correct.wav",
  },
  [THEMES.FUTURISTIC]: {
    openKeypadImg: "/src/assets/images/futuristic_controlpanel_open.png",
    resetImg: "/src/assets/images/futuristic_reset.png",
    clickAudio: "sounds/click_button.wav",
    failAudio: "sounds/wrong.wav",
    correctAudio: "sounds/correct.wav",
  },
};
