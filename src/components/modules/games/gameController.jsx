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
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  nextGame() {
    this.clear();

    let game = this.games.next();

    game.init();
    let self = this;
    this.timer = misc.setIntervalAndExecute(function() {
      game.simulate();
      game.render(self.canvas);
      
      if (game.isOver()) {
        self.nextGame();
      }
    }, game.getInterval());
  }
}

module.exports = GameController;
