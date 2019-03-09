// @ts-check
'use strict'

const snowColors = [
  '#FAFAFA',
  '#C0F6FB',
  '#FFFAFA',
  '#E0FFFF',
];

class Flake {
  constructor() {
    this._x = 0;
    this._y = 0;
    this._alive = false;
  }  
  simulate(game) {
    if (!this._alive) {
      if (Math.random() > 0.995) {
        this._x = game.getRandom(0, game.dim());
        this._y = -1 * game.getRandom(0, 10);
        this._alive = true;
        this.color = game.getRandomElement(snowColors);
        this.xMomentum = 0;
      }
    }
    else {
      if (Math.random() > 0.95) {
        this.xMomentum = Math.random() / 6 * (game.getRandomBool() ? 1 : -1);
      }
      this._y += Math.random() / 4;
      this._x += this.xMomentum;
    }
  }
  render(game) {
    const x = Math.round(this._x);
    const y = Math.round(this._y);
    if (this._alive && y >= 0) {
      if (y < game.dim()) {
        if (x >= 0 && x < game.dim()) {
          game.setPixel(x, y, this.color);
        }
      }
      else {
        this._alive = false;
      }
    }
  }
};

class Snow {
  constructor() {
    const NR_OF_FLAKES = 200;
    this.lastGameFrameBuffer = null;
    this.flakes = [];
    for (let i = 0; i < NR_OF_FLAKES; i++) {
      this.flakes.push(new Flake());
    }
    this.startTime = performance.now();
  }

  isOver() {
    return (performance.now() - this.startTime) > 1000 * 60;
  }
 
  render(game) {
    for (let i = 0; i < game.dim(); i++) {
      for (let j = 0; j < game.dim(); j++) {
        game.setPixel(i, j, this.lastGameFrameBuffer[i][j]);
      }
    }

    this.flakes.forEach(f => {
      f.simulate(game);
      f.render(game);
    });

    return this.isOver();
  }
};

module.exports = Snow;