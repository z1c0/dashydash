'use strict';

function getBoards() {
  const boardsConfig = require('./boards.config.json');
  let boards = [];
  for (var b in boardsConfig) {
    let modules = [];
    for (var m in boardsConfig[b].modules) {
      modules.push({
        name : m
      });
    }
    boards.push({ 
      name : b,
      icon : 'fa-user-circle-o',
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