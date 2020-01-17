'use strict';
const AnimationController = require('./animations/animationController.jsx');
const misc = require('../../common/misc.jsx');


const DIM = 32;

class BaseGame {
  create(canvas) {
    this.canvas = canvas;
    this.step = Math.floor(canvas.width / DIM);
    this.offsetX = Math.round((canvas.width - this.step * DIM) / 2);
    this.offsetY = Math.round((canvas.height - this.step * DIM) / 2);
    this.ctx = canvas.getContext('2d');

    this.init();
  }

  init() {
    this.world = this.createMatrix(DIM);
    this.buffer = this.createMatrix(DIM);
    this.gameOverAnimation = null;
    this.clearColor = '#222';
  }

  createMatrix(dim) {
    var arr = [];
    for (var x = 0; x < dim; x++) {
      arr[x] = [];
      for (var y = 0; y < dim; y++) {
        arr[x][y] = 0;
      }
    }
    return arr;
  }

  rgbToHex(r, g, b) {
    function componentToHex(c) {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  setPixel(x, y, color) {
    this.buffer[x][y] = color;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * this.step + 1 + this.offsetX, y * this.step + 1 + this.offsetY, this.step - 2, this.step - 2);
  }

  renderGameOver() {
    if (!this.gameOverAnimation) {
      this.gameOverAnimation = new AnimationController().getRandom();
      this.gameOverAnimation.lastGameFrameBuffer = this.buffer.map(function (arr) {
        return arr.slice();
      });
    }
    return this.gameOverAnimation.render(this);
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var y = 0; y < DIM; y++) {
      for (var x = 0; x < DIM; x++) {
        this.setPixel(x, y, this.mapColor(x, y));
      }
    }
  }

  dim() {
    return this.world.length;
  }

  clear(color) {
    this.clearColor = color;
    for (var i = 0; i < this.dim(); i++) {
      for (var j = 0; j < this.dim(); j++) {
        this.world[i][j] = color;
      }
    }
  }

  isClearColor(color) {
    return this.clearColor === color;
  }

  getClearColor() {
    return this.clearColor;
  }

  mapColor(x, y) {
    return this.world[x][y];
  }

  getRandomGray(allowTransparent) {
    if (allowTransparent && this.getRandomBool()) {
      return 'transparent';
    }
    const g = this.getRandom(0, 256);
    return this.makeColor([g, g, g]);
  }

  getRandomColor(allowTransparent) {
    if (allowTransparent && this.getRandomBool()) {
      return 'transparent';
    }
    switch (this.getRandom(0, 9)) {
      case 0: return 'red';
      case 1: return 'yellow';
      case 2: return 'chartreuse ';
      case 3: return 'dodgerblue';
      case 4: return 'fuchsia';
      case 5: return 'cyan';
      case 6: return 'deeppink';
      case 7: return 'orange';
      case 8: return 'purple';
    }
  }

  makeColor(rgb, opacity) {
    if (opacity) {
      return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + opacity + ")";
    }
    else {
      return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
    }
  }

  setColor(x, y, rgb) {
    this.world[x][y] = makeColor(rgb);
  }

  getRandom(min, max) {
    return misc.getRandom(min, max);
  }

  getRandomBool() {
    return Math.random() > 0.5;
  }

  getRandomElement(arr) {
    return misc.getRandomElement(arr);
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