'use strict';
var BaseGame = require('./baseGame.jsx');

class Dummy extends BaseGame {  
  constructor() {
    super();
  }

  getInterval() {
    return 500;
  }   
 
  isOver() {
    return this.x === 3;
  } 

  init() {
    super.init();
    this.reset();
  }

  reset() {
    this.x = 0;
    this.clear('gray');
  }

  simulate() {
    this.world[this.x][0] = this.getRandomColor(false);
    if (this.x++ === 10) {
      this.reset();
    }
  }
}

module.exports = Dummy;

