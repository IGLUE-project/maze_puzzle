//Copy this file to config.js and specify your own settings

export let ESCAPP_APP_SETTINGS = {
  //Settings that can be specified by the authors
  skin: "FUTURISTIC", //skin can be "STANDARD", "RETRO" or "FUTURISTIC".
  //backgroundImg: "NONE", //background can be "NONE" or a URL.
  // actionAfterSolve: "SHOW_MESSAGE", //actionAfterSolve can be "NONE" or "SHOW_MESSAGE".
  message: "¡Has superado el reto!",
  // actionWhenLoadingIfSolved: true,
  maze: {
    start: { x: 0, y: 0 },
    end: { x: 3, y: 7 },
    size: { x: 4, y: 8 },
  },

  //Settings that will be automatically specified by the Escapp server
  locale: "es",

  escappClientSettings: {
    endpoint: "https://escapp.es/api/escapeRooms/260",
    linkedPuzzleIds: [4],
    rtc: false,
  },
};
