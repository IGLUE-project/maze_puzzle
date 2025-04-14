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
    backgroundImg: "/src/assets/images/ancient_background.png",
    keypadImg: "/src/assets/images/ancient_wheel.png",
    openKeypadImg: "/src/assets/images/ancient_button.png",
    clickAudio: "sounds/click_button.wav",
    failAudio: "sounds/wrong.wav",
  },
  [THEMES.BASIC]: {
    backgroundImg: "",
    keypadImg: "",
    openKeypadImg: "",
    clickAudio: "sounds/click_button.wav",
    failAudio: "sounds/wrong.wav",
  },
  [THEMES.CONTEMPORARY]: {
    backgroundImg: "",
    keypadImg: "",
    openKeypadImg: "",
    clickAudio: "sounds/click_button.wav",
    failAudio: "sounds/wrong.wav",
  },
  [THEMES.FUTURISTIC]: {
    backgroundImg: "/src/assets/images/futuristic_background.png",
    openbackgroundImg: "/src/assets/images/futuristic_background.png",
    keypadImg: "/src/assets/images/futuristic_controlpanel.png",
    openKeypadImg: "/src/assets/images/futuristic_controlpanel_open.png",
    clickAudio: "sounds/click_button.wav",
    failAudio: "sounds/wrong.wav",
  },
};
