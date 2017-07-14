'use strict';
var Cursor = require('../common/misc.jsx').Cursor;


class BoardManager {
  constructor() {
    const boardsConfig = require('./boards.config.json');
    let boards = [];
    for (var b in boardsConfig) {
      let modules = [];
      let board = boardsConfig[b];
      if (!board.icon) {
        board.icon = 'fa-user-circle-o';
      }
      for (var m in board.modules) {
        modules.push({
          name : m,
          pos : board.modules[m]
        });
      }
      boards.push({ 
        name : b,
        icon : board.icon,
        modules : modules
      });
    }
    this.boards = new Cursor(boards);
  }

  getBoards() {
    let boards = [ {
      name : 'auto',
      icon : 'fa-automobile'
    }];
    //console.log(boards);
    return boards.concat(this.boards.array());
  }

  getBoard(name) {
    return this.getBoards().find(b => b.name === name);
  }

  next() {
    let b = this.boards.current();
    this.boards.next();
    return b;
  }
}

module.exports = BoardManager;
