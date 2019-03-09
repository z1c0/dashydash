'use strict';
var BaseGame = require('./baseGame.jsx');

const MAX_ROUNDS = 5;

class Dummy extends BaseGame {  
  constructor() {
    super();
  }

  getInterval() {
    return 1;
  }   
 
  isOver() {
    return this.i === MAX_ROUNDS;
  } 

  init() {
    super.init();
    this.reset();
  }

  reset() {
    this.i = 0;
    this.clear('gray');
  }

  simulate() {
    const x = this.i % 32;
    const y = Math.floor(this.i / 32); 
    this.world[x][y] = this.getRandomColor(false);
    this.i++;
  }
}

module.exports = Dummy;

