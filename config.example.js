//Copy this file to config.js and specify your own settings

export let ESCAPP_APP_SETTINGS = {
  //Settings that can be specified by the authors
  skin: "FUTURISTIC", //skin can be "RETRO", "STANDARD" or "FUTURISTIC".
  //backgroundImg: "NONE", //background can be "NONE" or a URL.
  actionAfterSolve: "SHOW_MESSAGE", //actionAfterSolve can be "NONE" or "SHOW_MESSAGE".
  message: "¡Has superado el reto! presiona continuar para seguir jugando.",

  mazeWidth: 8, //Width of the maze (number of cells horizontally)
  mazeHeight: 4, //Height of the maze (number of cells vertically)
  startPoint: { x: 1, y: 1 }, //Coordinates of the start point of the maze
  endPoint: { x: 8, y: 4 }, //Coordinates of the end point of the maze

  //Settings that will be automatically specified by the Escapp server
  locale: "es",

  escappClientSettings: {
    endpoint: "https://escapp.es/api/escapeRooms/id",
    linkedPuzzleIds: [1],
    rtc: false,
  },
};
