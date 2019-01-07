'use strict';
var BaseGame = require('./baseGame.jsx');

const FIRE_WIDTH = 32;
const FIRE_HEIGHT = 32;
const rgbs = [
  "#000000",
  "#000000",
  "#010101",
  "#030303",
  "#070707",
  "#1F0707",
  "#1F0707",
  "#2F0F07",
  //"#470F07",
  //"#571707",
  //"#671F07",
  //"#771F07",
  "#8F2707",
  "#9F2F07",
  //"#AF3F07",
  //"#BF4707",
  "#C74707",
  "#DF4F07",
  "#DF5707",
  //"#DF5707",
  //"#D75F07",
  "#D75F07",
  //"#D7670F",
  "#CF6F0F",
  //"#CF770F",
  "#CF7F0F",
  //"#CF8717",
  "#C78717",
  //"#C78F17",
  //"#C7971F",
  //"#BF9F1F",
  //"#BF9F1F",
  //"#BFA727",
  //"#BFA727",
  //"#BFAF2F",
  //"#B7AF2F",
  //"#B7B72F",
  "#B7B737",
  //"#CFCF6F",
  //"#DFDF9F",
  //"#EFEFC7",
  //"#FFFFFF",
];

class Fire extends BaseGame {
  constructor() {
    super();
    //console.log(rgbs.length);
    this.firePixels = [];
  }

  doFire() {
    for(let x = 0 ; x < FIRE_WIDTH; x++) {
        for (let y = 1; y < FIRE_HEIGHT; y++) {
            this.spreadFire(y * FIRE_WIDTH + x);
        }
    }
 }

  spreadFire(src) {
    const rand = Math.round(Math.random() * 3) & 3;
    var dst = src - rand + 1;
    this.firePixels[dst - FIRE_WIDTH ] = Math.max(0, this.firePixels[src] - (rand & 1));
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
    for (let i = 0; i < FIRE_WIDTH * FIRE_HEIGHT; i++) {
      this.firePixels[i] = 0;
    }
  
    for (let i = 0; i < FIRE_WIDTH; i++) {
      this.firePixels[(FIRE_HEIGHT - 1) * FIRE_WIDTH + i] = rgbs.length - 1;
    }

    this.rounds = 0
  }

  mapColor(x, y) {
    let index = this.firePixels[FIRE_WIDTH * y + x];
    return rgbs[index];
  }  
  
  simulate() {
    this.doFire();
    this.rounds++;
  }
}

module.exports = Fire;