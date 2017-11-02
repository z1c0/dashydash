'use strict';

const DIM = 32;
 


class BaseGame {
  init() {
    this.world = this.createMatrix(DIM);
  }

  createMatrix(dim) {
    var arr = [];
    for(var x = 0; x < dim; x++) {
      arr[x] = [];    
      for(var y = 0; y < dim; y++){ 
        arr[x][y] = 0;
      }    
    }
    return arr;
  }      

  render(canvas) {
    const step = canvas.width / DIM;
    const ctx = canvas.getContext('2d');
    for (var y = 0; y < DIM; y++){ 
      for (var x = 0; x < DIM; x++) {
        ctx.fillStyle = this.mapColor(x, y);
        //ctx.strokeStyle = "#AAA";
        ctx.strokeRect(x * step, y * step, step, step);
        ctx.fillRect(x * step, y * step, step, step);
      }    
    }
  }

  dim() {
    return this.world.length;
  }

  clear(color) {
    for (var i = 0; i < this.dim(); i++) {
      for (var j = 0; j < this.dim(); j++) {
        this.world[i][j] = color;
      }  
    }
  }

  mapColor(x, y) {
    return this.world[x][y];
  }

  getRandom (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  getRandomBool() {
    return Math.random() > 0.5;
  }  
  
  getRandomPos() {
    var x = this.getRandom(0, this.world.length);
    var y = this.getRandom(0, this.world.length);
    if (this.world[x][y] == 0) {
      return [x, y];
    }
    else {
      return this.getRandomPos();
    }
  }   
}

module.exports = BaseGame;