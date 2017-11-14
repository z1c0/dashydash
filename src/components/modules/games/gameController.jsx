'use strict';
var misc = require('../../common/misc.jsx');
var Cursor = misc.Cursor;
var Snake = require('./snake.jsx');
var TicTacToe = require('./tictactoe.jsx');
var Pong = require('./pong.jsx');
var SpaceInvaders = require('./spaceInvaders.jsx');
var PacMan = require('./pacman.jsx');


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
