// @ts-check
'use strict'
const misc = require('../../../common/misc.jsx');

class Flake {
  constructor(colors) {
    this._x = 0;
    this._y = 0;
    this._alive = false;
    this._colors = colors;
    this.canRespawn = true;
  }

  isDead() {
    return !this._alive;
  }

  spawn(x, y) {
    this._x = x;
    this._y = y;
    this._alive = true;
    this.color = misc.getRandomElement(this._colors);
    this.xMomentum = 0;
  }

  simulate(game) {
    if (!this._alive) {
      if (this.canRespawn && Math.random() > 0.995) {
        this.spawn(game.getRandom(0, game.dim()), -1 * game.getRandom(0, 10));
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

module.exports = Flake;