'use strict';
var Cursor = require('../common/misc.jsx').Cursor;


function getBoards(collection) {
  let boards = [];
  for (var b in collection) {
    let modules = [];
    let board = collection[b];
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
  return boards;
}

class BoardManager {
  constructor() {
    const boardsConfig = require('./boards.config.json');
    this.boards = new Cursor(getBoards(boardsConfig.default));
    this.manualBoards = getBoards(boardsConfig.manual);
  }

  getBoards() {
    let boards = [ {
      name : 'auto',
      icon : 'fa-automobile'
    }];
    boards = boards.concat(this.manualBoards);
    boards = boards.concat(this.boards.array());
    //console.log(boards);
    return boards;
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
