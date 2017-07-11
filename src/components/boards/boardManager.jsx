'use strict';

function getBoards() {
  const boardsConfig = require('./boards.config.json');
  let boards = [];
  for (var b in boardsConfig) {
    let modules = [];
    let board = boardsConfig[b];
    for (var m in board.modules) {
      modules.push({
        name : m,
        pos : board.modules[m]
      });
    }
    boards.push({ 
      name : b,
      modules : modules
    });
  }
  //console.log(boards);
  return boards;
}

function getBoard(name) {
  return getBoards().find(b => b.name === name);
}


module.exports = {
  getBoards : getBoards,
  getBoard : getBoard
}