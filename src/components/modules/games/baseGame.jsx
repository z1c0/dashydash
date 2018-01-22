'use strict';

const DIM = 32;
 
class BaseGame {
  create(canvas) {
    this.canvas = canvas;
    this.step = Math.floor(canvas.width / DIM);
    this.ctx = canvas.getContext('2d');

    this.init();
  }

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

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var y = 0; y < DIM; y++){ 
      for (var x = 0; x < DIM; x++) {
        this.ctx.fillStyle = this.mapColor(x, y);
        this.ctx.fillRect(x * this.step + 1, y * this.step + 1, this.step - 2, this.step - 2);
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

  makeColor(rgb) {
    return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] +")";
  }

  setColor(x, y, rgb) {
    this.world[x][y] = makeColor(rgb);
  }

  getRandom(min, max) {
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