'use strict';
var Snake = require('./snake.jsx');
var TicTacToe = require('./tictactoe.jsx');
var Pong = require('./pong.jsx');
var SpaceInvaders = require('./spaceInvaders.jsx');


class GameController {
  constructor(canvas) {
    this.canvas = canvas;
    this.DIM = 32;
    this.index = -1;
    this.games = [
      //new Snake(),
      //new TicTacToe(),
      //new Pong(),
      new SpaceInvaders()
    ]
  }

  nextGame() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.index = (this.index + 1) % this.games.length;
    let game = this.games[this.index];

    game.init();
    let self = this;
    this.timer = setInterval(function() {
      game.simulate();
      game.render(self.canvas);
      
      if (game.isOver()) {
        self.nextGame();
      }
    }, game.getInterval());
  }
}

module.exports = GameController;
