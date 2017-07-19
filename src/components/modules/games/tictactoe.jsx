'use strict';
var misc = require('../../common/misc.jsx');
var BaseGame = require('./baseGame.jsx');

const VOID = 0;
const GRID = 1;
const CIRCLE = 2;
const CIRCLE_WIN = 12;
const CROSS = 3;
const CROSS_WIN = 13;
  
const STATE_PLAYING = 1;
const STATE_WINNER = 2;
const STATE_OVER = 3;


class TicTacToe extends BaseGame {  
  constructor() {
    super();
    this.playerOne = false;
  }
    
  getInterval() {
    return 750;
  }
  
  init() {
    super.init();
    this.roundsToPlay = 5;
    this.field = this.createMatrix(3);
    this.reset();
  }
  
  reset() {
    this.state = STATE_PLAYING;
    this.playSmart = this.getRandomBool();
    this.playerOne = this.getRandomBool();
    
    for (var i = 0; i < this.field.length; i++) {
      for (var j = 0; j < this.field.length; j++) {
        this.field[i][j] = VOID;
      }
    }
      
    for (var i = 0; i < this.world.length; i++) {
      for (var j = 0; j < this.world.length; j++) {
        var col = VOID;
        if (i != 0 && j != 0 && i != this.world.length - 1 && j != this.world.length - 1) {
          if (i == 10 || i == 21 || j == 10 || j == 21) {
            col = GRID;
          }
        }
        this.world[i][j] = col;
      }
    }
  }
  
  getNextPos(what) {
    // create array of empty fields
    var pos = 0;
    var candidates = [];
    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 3; x++) {
        if (this.field[x][y] == VOID) {
          candidates.push({
            x : x,
            y : y
          });
        }
      }
    }
    candidates = misc.shuffle(candidates);
    
    if (this.playSmart) {
      // evaluate fields
      var highScore = -1;
      for (var i = 0; i < candidates.length; i++) {
        var c = candidates[i];
        var score = 0;
        score += this.evaluateLine(what, [[0, c.y], [1, c.y], [2, c.y]]);
        score += this.evaluateLine(what, [[c.x, 0], [c.x, 1 ], [c.x, 2]]);
        if (c.x == c.y) {
          score += this.evaluateLine(what, [[0, 0], [1, 1 ], [2, 2]]);
        }
        else if (c.x + c.y == 2) {
          score += this.evaluateLine(what, [[2, 0], [1, 1 ], [2, 0]]);
        }
        if (score > highScore) {
          highScore = score;
          pos = i;
        }
      } 
    }
    else {
      // random empty field
      pos = this.getRandom(0, candidates.length);
    }
    return candidates[pos];
  }
  
  evaluateLine(what, cells) {
    var score = 1;
    var result = this.checkLine(cells, false);
    if (result.x == 2 || result.y == 2) {
      score += 2;
    }
    return score;
  }
  
  checkLine(cells, mark) {
    var x = 0;
    var o = 0;
    for (var i = 0; i < 3; i++) {
      var v = this.field[cells[i][0]][cells[i][1]];
      if (v == CIRCLE) {
        o++;
      }
      else if (v == CROSS) {
        x++;
      }
    }
    if (this.state != STATE_WINNER) {
      if (mark && (x == 3 || o == 3)) {
        this.state = STATE_WINNER;
        for (var i = 0; i < 3; i++) {
          this.draw(cells[i][0], cells[i][1], this.field[cells[i][0]][cells[i][1]] + 10); 
        }
      }
    }
    return {
      x : x,
      o: o,
    };
  }
  
  checkIfOver() {
    this.checkLine([[0, 0], [1, 1], [2, 2]], true);
    this.checkLine([[2, 0], [1, 1], [0, 2]], true);
    for (var i = 0; i < 3; i++) {
      this.checkLine([[i, 0], [i, 1], [i, 2]], true);
      this.checkLine([[0, i], [1, i], [2, i]], true);
    }
    
    if (this.state == STATE_PLAYING) {
      var voids = 0;
      for (var i = 0; i < this.field.length; i++) {
        for (var j = 0; j < this.field.length; j++) {
          if (this.field[i][j] == VOID) {
            voids++;
          }
        }
      }
      if (voids == 0) {
        this.state = STATE_OVER;
      }
    }
  }
  
  simulate() {
    if (this.state == STATE_PLAYING) {
      this.checkIfOver();
    }
    
    if (this.state == STATE_OVER) {
      this.reset();
      this.roundsToPlay--;
    }
    else if (this.state == STATE_WINNER) {
      this.state = STATE_OVER;
    }
    else {
      var what = this.playerOne ? CIRCLE : CROSS;
      var pos = this.getNextPos(what);
      this.draw(pos.x, pos.y, what);
      this.field[pos.x][pos.y] = what;
      this.playerOne = !this.playerOne;
    }
  }
  
  isOver() {
    return this.roundsToPlay == 0;
  }
  
  draw(col, row, what) {
    var offX = col * 11 + 1;
    var offY = row * 11 + 1;
    if (what == CIRCLE || what == CIRCLE_WIN) {
      this.world[offX + 3][offY + 0] = what;
      this.world[offX + 2][offY + 1] = what;
      this.world[offX + 1][offY + 1] = what;
      this.world[offX + 1][offY + 2] = what;
      this.world[offX + 0][offY + 3] = what;
    }
    else {
      this.world[offX + 0][offY + 0] = what;
      this.world[offX + 1][offY + 1] = what;
      this.world[offX + 2][offY + 2] = what;
      this.world[offX + 3][offY + 3] = what;
    }
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        var x = offX + j;
        var y = offY + i;
        var v = this.world[x][y];
        this.world[x][offY + 7 - i] = v;
        this.world[offX + 7 - j][y] = v;
        this.world[offX + 7 - j][offY + 7 - i] = v;
      }
    }
  }

  mapColor(x, y) {
    switch (this.world[x][y]) {
      case GRID:
        return '#F1F1F1';
        
        case CIRCLE:
          return this.playSmart ? 'limegreen' : 'cyan';
          
        case CROSS:
          return this.playSmart ? 'cornflowerblue' : 'purple';
          
        case CIRCLE_WIN:
        case CROSS_WIN:
          return 'gold';
          
      default:
        return '#222';
    }
  }
}

module.exports = TicTacToe;