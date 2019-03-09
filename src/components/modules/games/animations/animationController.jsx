'use strict'
const misc = require('../../../common/misc.jsx');
const Fire = require('./fire.jsx');
const Matrix = require('./matrix.jsx');
const Snow = require('./snow.jsx');

class GameOverAnimationDefault {
  constructor(useColors) {
    this.steps = -5;
    this.useColors = useColors;
  }
  
  render(game) {
    if (this.steps >= 0) {
      for (let y = 0; y < Math.min(game.dim(), this.steps); y++){ 
        for (let x = 0; x < game.dim(); x++) {
          if (this.useColors) {
            if (game.getRandomBool()) {
              game.setPixel(x, y, game.getRandomColor(true));
            }
          }
          else {
            game.setPixel(x, y, game.getRandomGray(true));
          }
        }
      }
    }
    return this.steps++ == (game.dim() + 25);
  }
}

class AnimationController {
  getRandom() {
    return misc.shuffle([
      new GameOverAnimationDefault(true),
      new GameOverAnimationDefault(false),
      new Fire(),
      new Matrix(),
      new Snow(),
    ])[0];
  }
}

module.exports = AnimationController;