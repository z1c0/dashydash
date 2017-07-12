'use strict';
var BaseGame = require('./baseGame.jsx');

const VOID = 0;
const SNAKE_UP = 10;
const SNAKE_DOWN = 11;
const SNAKE_LEFT = 12;
const SNAKE_RIGHT = 13;
const FOOD = 20;
const WALL = 30; 

class Snake extends BaseGame {  
  constructor() {
    super();
    this.tail = [];
    this.head = [];
    this.food = [];
    this.grow = 0;
  }

  getInterval() {
    return 100;
  }

   
  init() {
    super.init();
    this.lives = 1;
    this.reset();
  }
  
  isOver() {
    return this.lives == 0;
  }
  
  reset() {
    // walls
    for (var i = 0; i < this.world.length; i++) {
      for (var j = 0; j < this.world.length; j++) {
        var cell = VOID;
        if (i == 0 || j == 0 || i == this.world.length - 1 || j == this.world.length - 1) {
          cell = WALL;
        }
        this.world[i][j] = cell;
      }
    }
    // snake
    var x = this.getRandom(5, this.world.length - 10);
    var y = this.getRandom(2, this.world.length - 2);
    this.tail[0] = x; 
    this.tail[1] = y;
    this.world[x][y] = SNAKE_RIGHT;
    x++;
    this.world[x][y] = SNAKE_RIGHT;
    x++;
    this.world[x][y] = SNAKE_RIGHT;
    this.head[0] = x;
    this.head[1] = y;
    // food
    this.food = this.getRandomPos();
    this.world[this.food[0]][this.food[1]] = FOOD;
  }
  
  mapColor(x, y) {
    var value = this.world[x][y];
    switch (value) {
      case SNAKE_UP:
      case SNAKE_DOWN:
      case SNAKE_LEFT:
      case SNAKE_RIGHT:
        return "limegreen";
      
      case FOOD:
        return "orangered";

      case WALL:
        return "#233E96";
    }
    return "#444444";
  }
  
  checkMove(cell, dir) {
    var tmp = cell.slice();
    this.setCellValue(tmp, dir);
    var v = this.getCellValue(this.moveCell(tmp));
    return (v == VOID || v == FOOD);
  }
  
  simulate() {
    var dir = this.getCellValue(this.head);
    // steer to food
    var dx = this.food[0] - this.head[0];
    var dy = this.food[1] - this.head[1];
    if (dx != 0) {
      if (dir == SNAKE_UP || dir == SNAKE_DOWN) {
        dir = (dx < 0) ? SNAKE_LEFT : SNAKE_RIGHT;
      } 
    }
    if (dy != 0) {
      if (dir == SNAKE_LEFT || dir == SNAKE_RIGHT) {
        dir = (dy < 0) ? SNAKE_UP : SNAKE_DOWN;
      }
    }
    this.setCellValue(this.head, dir);
    
    // check
    dir = this.getCellValue(this.head);
    if (!this.checkMove(this.head, dir)) {
      var o = [];
      if (dir == SNAKE_UP || dir == SNAKE_DOWN) {
        o = this.shuffle([SNAKE_LEFT, SNAKE_RIGHT]);
      } 
      else {
        o = this.shuffle([SNAKE_UP, SNAKE_DOWN]);
      }
      if (!this.checkMove(this.head, o[0])) {
        this.checkMove(this.head, o[1]);
      }
    }
    
    // move
    this.move();
  }
  
  getCellValue(cell) {
    return this.world[cell[0]][cell[1]];
  }
  
  setCellValue(cell, value) {
    this.world[cell[0]][cell[1]] = value;
  }
  
  moveCell(cell) {
    var dir = this.getCellValue(cell);
    switch (dir) {
      case SNAKE_UP:
        cell[1]--;
        break;
      case SNAKE_DOWN:
        cell[1]++;
        break;
      case SNAKE_LEFT:
        cell[0]--;
        break;
      case SNAKE_RIGHT:
        cell[0]++;
        break;
    }
    return cell;
  }
  
  move() {
    if (this.grow == 0) {
      // move tail
      var oldTail = this.tail.slice();
      this.moveCell(this.tail);
      this.setCellValue(oldTail, VOID);
    }
    else {
      this.grow--;
    }
    // move head
    var vOld = this.getCellValue(this.head);
    this.moveCell(this.head);
    var v = this.getCellValue(this.head);
    switch(v) {
      case FOOD:
        this.food = this.getRandomPos();
        this.setCellValue(this.food, FOOD);
        this.grow = 3;
        // fall through
      
      case VOID:
        this.setCellValue(this.head, vOld);
        break;
        
      default:
        this.lives--;
        this.reset();
    }
  }
}


module.exports = Snake;

