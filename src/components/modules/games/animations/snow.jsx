// @ts-check
'use strict'

class Flake {
  constructor() {
    this._x = 0;
    this._y = 0;
    this._alive = false;
  }  
  simulate(game) {
    if (!this._alive) {
      this._x = game.getRandom(0, game.dim());
      this._y = -1 * game.getRandom(0, 10);
      this._alive = true;
    }
    else {
      this._y += Math.random() / 5;
    }
  }
  render(game) {
      const x = Math.round(this._x);
      const y = Math.round(this._y);
      if (this._alive && y >= 0) {
        if (y < game.dim()) {
          game.setPixel(x, y, 'white');
        }
        else {
          this._alive = false;
        }
      }
  }
};

class Snow {
  constructor() {
    const NR_OF_FLAKES = 100;
    this.flakes = [];
    for (let i = 0; i < NR_OF_FLAKES; i++) {
      this.flakes.push(new Flake());
    }
    this.startTime = performance.now();
  }

  isOver() {
    return (performance.now() - this.startTime) > 1000 * 5;
  }
 
  render(game) {
    this.flakes.forEach(f => {
      f.simulate(game);
      f.render(game);
    });

    return this.isOver();
  }
};

module.exports = Snow;