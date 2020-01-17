'use strict'

const MAX_ROUNDS = 250;
const NR_OF_COLS = 32;

const whites = [
  [200, 200, 200],
  [255, 255, 255],
  [225, 225, 225],
];

const greens = [
  [124, 252,   0],
  [127, 255,   0],
  [ 50, 205,  50],
  [  0, 255,   0],
  [ 34, 139,  34],
  [  0, 128,   0],
  [  0, 100,   0],
];

class Matrix {
  constructor() {
    this.rounds = 0
  }

  isOver() {
    return this.rounds++ === MAX_ROUNDS;
  }
 
  render(game) {
    if (!this.columns) {
      this.columns = [];
      for (let i = 0; i < NR_OF_COLS; i++) {
        this.columns.push({ active : true, y : -1 * game.getRandom(0, game.dim() / 4), length : game.getRandom(8, game.dim()) });
      }
    }

    // wake up strands
    for (let i = 0; i < 3; i++) {
      let col = game.getRandomElement(this.columns);
      if (!col.active) {
        col.active = true;
        col.y = 0;
        col.length = game.getRandom(8, game.dim());
      }
    }

    for (let x = 0; x < this.columns.length; x++) {
      let col = this.columns[x];
      if (col.active) {
        for (let y = col.y; y >= 0; y--) {
          let color = 'black';
          if (y === col.y) {
            color = game.makeColor(game.getRandomElement(whites));
          } 
          else if ((col.y - y) < col.length) {
            color = game.makeColor(game.getRandomElement(greens));
          }
          // draw pixel
          if (y < game.dim()) {
            game.setPixel(x, y, color);
          }
        }
        col.y++;

        // out of visible area?
        if (col.y - col.length > game.dim()) {
          col.active = false;
        }
      }
    }

    return this.isOver();
  }
};

module.exports = Matrix;