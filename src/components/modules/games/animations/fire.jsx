'use strict';

const MAX_ROUNDS = 500;
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

class Fire {
  constructor() {
    //console.log(rgbs.length);
    this.firePixels = [];
    this.reset();
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

  isOver() {
    return this.rounds === MAX_ROUNDS;
  }
  
  isGoingOut() {
    return this.rounds >= MAX_ROUNDS - 45;
  }

  reset() {
    for (let i = 0; i < FIRE_WIDTH * FIRE_HEIGHT; i++) {
      this.firePixels[i] = 0;
    }
  
    this.setBottomRow(rgbs.length - 1);

    this.rounds = 0
  }

  setBottomRow(col) {
    for (let i = 0; i < FIRE_WIDTH; i++) {
      this.firePixels[(FIRE_HEIGHT - 1) * FIRE_WIDTH + i] = col;
    }
  }
  
  render(game) {
    this.doFire();

    for (let y = 0; y < game.dim(); y++){ 
      for (let x = 0; x < game.dim(); x++) {
        let index = this.firePixels[FIRE_WIDTH * y + x];
        if (index !== 0 || this.isGoingOut()) {
          game.setPixel(x, y, rgbs[index]);
        }
      }
    }

    this.rounds++;

    if (this.isGoingOut()) {
      this.setBottomRow(0);
    }

    return this.isOver();
  }
}

module.exports = Fire;