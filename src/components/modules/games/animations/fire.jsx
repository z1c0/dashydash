'use strict';

const MAX_ROUNDS = 500;
const FIRE_WIDTH = 32;
const FIRE_HEIGHT = 32;

// colors: https://jsfiddle.net/u5dk4xrc/

const rgbs_r = [
  "#000000",
  "#000000",
  "#010101",
  "#030303",
  "#070707",
  "#1F0707",
  "#1F0707",
  "#2F0F07",
  "#8F2707",
  "#9F2F07",
  "#C74707",
  "#DF4F07",
  "#DF5707",
  "#D75F07",
  "#CF6F0F", 
  "#CF7F0F",
  "#C78717",
  "#B7B737",
];
const rgbs_g = [
  "#000000",
  "#000000",
  "#010101",
  "#030303",
  "#070707",
  "#1F0707",
  "#000700",
  "#004F00",
  "#004700",
  "#005F00",
  "#005700",
  "#005F00",
  "#006700",
  "#006F00",
  "#007F00", 
  "#009F00",
  "#00A700",
  "#00C700",
];
const rgbs_b = [
  "#000000",
  "#000000",
  "#010101",
  "#030303",
  "#070707",
  "#1F0707",
  "#000700",
  "#0e0663",
  "#140999",
  "#271baa",
  "#4641f4",
  "#4158f4",
  "#4173f4",
  "#418bf4",
  "#419df4", 
  "#41aff4",
  "#41bef4",
  "#42cef4",
];
let rgbs = rgbs_r;

class Fire {
  constructor() {
    const r = Math.random();

    if (r < 0.6) {
      rgbs = rgbs_r;
    } 
    else if (r < 0.8) {
      rgbs = rgbs_g;
    }
    else {
      rgbs = rgbs_b;
    }
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