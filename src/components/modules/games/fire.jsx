'use strict';
var BaseGame = require('./baseGame.jsx');

const FIRE_WIDTH = 32;
const FIRE_HEIGHT = 32;
const rgbs = [
  "#070707",
  "#1F0707",
  "#2F0F07",
  "#470F07",
  "#571707",
  "#671F07",
  "#771F07",
  "#8F2707",
  "#9F2F07",
  "#AF3F07",
  "#BF4707",
  "#C74707",
  "#DF4F07",
  //"#DF5707",
  //"#DF5707",
  "#D75F07",
  "#D75F07",
  "#D7670F",
  "#CF6F0F",
  "#CF770F",
  "#CF7F0F",
  //"#CF8717",
  "#C78717",
  "#C78F17",
  "#C7971F",
  //"#BF9F1F",
  "#BF9F1F",
  //"#BFA727",
  "#BFA727",
  //"#BFAF2F",
  "#B7AF2F",
  "#B7B72F",
  "#B7B737",
  "#CFCF6F",
  "#DFDF9F",
  "#EFEFC7",
];

class Fire extends BaseGame {
  constructor() {
    super();
  }

  spreadFire(x, y) {
    const randIdx = Math.round(Math.random() * 3.0) & 3;
    const dst = Math.max(0, y - randIdx);
    const destX = Math.min(FIRE_WIDTH - 1, x + (randIdx & 1));
    this.world[destX][y] = rgbs[dst];
  }

  doFire() {
    for (let x = 0 ; x < FIRE_WIDTH; x++) {
      for (let y = FIRE_HEIGHT - 1; y >= 0; y--) {
        this.spreadFire(x, y);
      }
    }
  }  

  getInterval() {
    return 100;
  }
   
  init() {
    super.init();
    this.reset();
  }
  
  isOver() {
    return this.rounds === 500;
  }
  
  reset() {
    this.clear('black');
    this.rounds = 0
  }
  
  simulate() {
    this.doFire();
    this.rounds++;
  }
}

module.exports = Fire;