// @ts-check
'use strict'

const Flake = require('./flake.jsx');

const ashColors = [
  '#555',
  '#666',
  '#777',
  '#888',
];

class Thanos {
  constructor() {
    this.lastGameFrameBuffer = null;
    this.flakes = [];
    this.startTime = performance.now();
  }

  isOver() {
    return this.flakes.every(f => f.isDead());
  }

  render(game) {
    if (this.lastGameFrameBuffer != null) {
      for (let i = 0; i < game.dim(); i++) {
        for (let j = 0; j < game.dim(); j++) {
          let col = this.lastGameFrameBuffer[i][j];
          if (!game.isClearColor(col)) {
            const flake = new Flake(ashColors);
            flake.spawn(i, j);
            flake.canRespawn = false;
            this.flakes.push(flake);
          }
        }
      }
      this.lastGameFrameBuffer = null;
    }

    game.clear(game.getClearColor());
    game.render();

    this.flakes.forEach(f => {
      f.simulate(game);
      f.render(game);
    });

    return this.isOver();
  }
};

module.exports = Thanos;