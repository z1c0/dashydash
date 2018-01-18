'use strict';
const misc = require('../../common/misc.jsx');
const Cursor = misc.Cursor;
const Snake = require('./snake.jsx');
const TicTacToe = require('./tictactoe.jsx');
const Pong = require('./pong.jsx');
const SpaceInvaders = require('./spaceInvaders.jsx');
const PacMan = require('./pacman.jsx');
const Arkanoid = require('./arkanoid.jsx');


class GameController {
  constructor(canvas) {
    this.canvas = canvas;
    this.DIM = 32;
    this.games = new Cursor(misc.shuffle([
      new PacMan(),
      new TicTacToe(),
      new Pong(),
      new Snake(),
      new SpaceInvaders(),
      new Arkanoid()
    ]));
  }

  clear()  {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
    }
  }

  nextGame() {
    this.clear();

    let game = this.games.next();

    game.create(this.canvas);

    let last = performance.now();
    let self = this;
    function step(now) {
      if (now - last >= 10 /* game.getInterval() */) {
        last = now;
        game.simulate();
        game.render();
      }
      if (game.isOver()) {
        self.nextGame();
      }
      else {
        window.requestAnimationFrame(step);
      }
    }
    this.animationFrameId = window.requestAnimationFrame(step);
  }
}

module.exports = GameController;
