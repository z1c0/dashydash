'use strict';
var BaseGame = require('./baseGame.jsx');


const BALL_COLOR = 'yellow';
const PADDLE_COLOR = 'whitesmoke';


class Ball {
  constructor(game) {
    this.game = game;
    this.max = this.game.dim() - 1;
    this.dx = 1;
    this.dy = 1;
    this.x = this.game.paddle1.x + 2;
    this.y = this.game.paddle1.y;
  }

  simulate() {
    if (this.x <= 1 || this.x >= this.max - 1) {
      this.dx *= -1;
      this.game.rounds--;
    }
    if (this.y === 0 || this.y === this.max) {
      this.dy *= -1;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.game.world[this.x][this.y] = BALL_COLOR; 
  }
}

class Paddle {
  constructor(playerOne, game) {
    this.playerOne = playerOne;
    this.game = game;
    this.x = this.playerOne ? 0 : this.game.dim() - 1;
    this.y = this.game.getRandom(2, this.game.dim() - 3);
  }

  simulate() {
    if (this.playerOne && this.game.ball.dx === -1 || !this.playerOne && this.game.ball.dx === 1) {
      if (this.y > this.game.ball.y) {
        this.y--;
      }
      else if (this.y < this.game.ball.y) {
        this.y++;
      }
    }
    this.draw();
  }

  draw() {
    this.game.world[this.x][this.y - 2] = PADDLE_COLOR;
    this.game.world[this.x][this.y - 1] = PADDLE_COLOR;
    this.game.world[this.x][this.y] = PADDLE_COLOR;
    this.game.world[this.x][this.y + 1] = PADDLE_COLOR;
    this.game.world[this.x][this.y + 2] = PADDLE_COLOR;
  }
}


class Pong extends BaseGame {  
  constructor() {
    super();
  }

  getInterval() {
    return 100;
  }
   
  init() {
    super.init();
    this.paddle1 = new Paddle(true, this);
    this.paddle2 = new Paddle(false, this);
    this.ball = new Ball(this);
    this.reset();
  }
  
  isOver() {
    return this.rounds === 0;
  }
  
  reset() {
    this.rounds = 50;
  }  
  
  simulate() {
    this.clear('darkgreen');
    let dim = this.dim();
    for (var i = 0; i < dim; i++) {
      this.world[dim / 2 - i % 2][i] = 'white';
    }
    this.ball.simulate();
    this.paddle1.simulate();
    this.paddle2.simulate();
  }
}


module.exports = Pong;

