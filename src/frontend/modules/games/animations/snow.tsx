// @ts-check
'use strict'

const Flake = require('./flake.jsx');

const snowColors = [
  '#FAFAFA',
  '#C0F6FB',
  '#FFFAFA',
  '#E0FFFF',
];

class Snow {
  constructor() {
    const NR_OF_FLAKES = 200;
    this.lastGameFrameBuffer = null;
    this.flakes = [];
    for (let i = 0; i < NR_OF_FLAKES; i++) {
      this.flakes.push(new Flake(snowColors));
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