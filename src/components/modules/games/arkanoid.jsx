'use strict';
const BaseGame = require('./baseGame.jsx');
const misc = require('../../common/misc.jsx');

const CLEAR_COLOR = '#222222';
const BALL_COLOR = 'white';
const SHIP_COLOR = '#0033CC';


class Ball {
  constructor(game, x) {
    this.game = game;
    this.max = this.game.dim() - 1;
    this.dx = 1;
    this.dy = 1;
    this.x = x;
    this.y = this.max;
  }

  simulate() {
    if (this.x === 0 || this.x === this.max) {
      this.dx *= -1;
    }
    if (this.y === 0 || this.y === this.max) {
      this.dy *= -1;
    }
    this.game.world[this.x][this.y] = CLEAR_COLOR;

    this.x += this.dx;
    this.y += this.dy;

    if (this.game.world[this.x][this.y] != CLEAR_COLOR) {
      this.game.world[this.x][this.y] = CLEAR_COLOR;
      this.game.world[Math.max(0, this.x - 1)][this.y] = CLEAR_COLOR;
      this.game.world[Math.min(this.game.dim() - 1, this.x + 1)][this.y] = CLEAR_COLOR;
      this.dy *= -1;
      this.y += this.dy;
    }
    this.game.world[this.x][this.y] = BALL_COLOR;
  }
}

class Ship {
  constructor(game, x) {
    this.game = game;
    this.x = x;
    this.y = this.game.dim() - 1;
  }

  simulate() {
    this.draw(CLEAR_COLOR);

    if (this.x > this.game.ball.x) {
      this.x = Math.max(2, this.x - 1);
    }
    else if (this.x < this.game.ball.x) {
      this.x = Math.min(this.game.dim() - 3, this.x + 1);
    }
    
    this.draw(SHIP_COLOR);
  }

  draw(col) {
    this.game.world[this.x - 2][this.y] = col;
    this.game.world[this.x - 1][this.y] = col;
    this.game.world[this.x    ][this.y] = col;
    this.game.world[this.x + 1][this.y] = col;
    this.game.world[this.x + 2][this.y] = col;
  }
}

class Arkanoid extends BaseGame {
  constructor() {
    super();
  }

  getInterval() {
    return 100;
  }
   
  init() {
    super.init();
    const x = Math.floor(this.dim() / 2) - this.getRandom(-4, 4);
    this.ball = new Ball(this, x);
    this.ship = new Ship(this, x);
    this.reset();
  }
  
  isOver() {
    return this.rounds === 750;
  }

  combine(rgb1, rgb2) {
    return [
      Math.floor((rgb1[0] + rgb2[0]) / 2),
      Math.floor((rgb1[1] + rgb2[1]) / 2),
      Math.floor((rgb1[2] + rgb2[2]) / 2)
    ];
  }

  drawRect(x1, y1, x2, y2, rgb1, rgb2, rgb3, rgb4) {
    this.world[x1][y1] = "rgb(" + rgb1[0] + "," + rgb1[1] + "," + rgb1[2] +")";
    this.world[x2][y1] = "rgb(" + rgb2[0] + "," + rgb2[1] + "," + rgb2[2] +")";
    this.world[x1][y2] = "rgb(" + rgb3[0] + "," + rgb3[1] + "," + rgb3[2] +")";
    this.world[x2][y2] = "rgb(" + rgb4[0] + "," + rgb4[1] + "," + rgb4[2] +")";
    
    const w = Math.floor((x2 - x1) / 2);
    const h = Math.floor((y2 - y1) / 2);
    if (w === 0 && h === 0) {
    }
    else {
      const rgb_12 = this.combine(rgb1, rgb2);
      const rgb_13 = this.combine(rgb1, rgb3);
      const rgb_24 = this.combine(rgb2, rgb4);
      const rgb_34 = this.combine(rgb3, rgb4);
      const rgb_12_34 = this.combine(rgb_12, rgb_34);
      this.drawRect(x1    , y1    , x1 + w, y1 + h, rgb1, rgb_12, rgb_13, rgb_12_34);
      this.drawRect(x1 + w, y1    , x2    , y1 + h, rgb_12, rgb2, rgb_12_34, rgb_24);
      this.drawRect(x1    , y1 + h, x1 + w, y2    , rgb_13, rgb_12_34, rgb3, rgb_34);
      this.drawRect(x1 + w, y1 + h, x2    , y2    , rgb_12_34, rgb_24, rgb_34, rgb4);
    }
  }
  
  reset() {
    this.rounds = 0;
    this.clear(CLEAR_COLOR);

    const startColors = [
      [this.getRandom(150, 255), 0, 0],
      [0, this.getRandom(150, 255), 0],
      [0, 0, this.getRandom(150, 255)],
      [this.getRandom(150, 255), 0, this.getRandom(150, 255)],
      [this.getRandom(150, 255), this.getRandom(150, 255), 0],
      [0, this.getRandom(150, 255), this.getRandom(150, 255)],
    ];
    misc.shuffle(startColors);

    this.drawRect(0, 0, this.dim() - 1, 12, startColors[0], startColors[1], startColors[2], startColors[3]);
  }
  
  simulate() {
    this.ball.simulate();
    this.ship.simulate();
    this.rounds++;
  }
}

module.exports = Arkanoid;