'use strict';
var BaseGame = require('./baseGame.jsx');


const FLIP = 0;
const FLAP = 1;
const EXPLODING = 2;

const INVADER = '#03FE04';

class Invader {
  constructor(game) {
    this.game = game;
    this.sprites = [
      [
        [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0 ],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0 ],
        [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0 ],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1 ],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1 ],
        [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0 ],
      ],
      [
        [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
        [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1 ],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1 ],
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1 ],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ],
        [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0 ],
      ],
      [
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0 ],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1 ],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0 ],
        [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
        [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1 ],
        [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0 ],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1 ],
      ],
    ];
    this.reset();
  }

  reset() {
    this.x = 0;
    this.y = 0;
    this.dx = 1;
    this.delay = 0;
    this.state = FLIP;
  }

  move() {
    this.x += this.dx;
    if (this.x === 0 || this.x === this.game.dim() - this.sprites[0][0].length) {
      this.dx *= -1;
      this.y += 2;
    }
  }

  simulate() {
    if (this.delay-- <= 0) {
      this.delay = 2;

      if (this.state === EXPLODING) {
        if (this.explodingDelay-- == 0) {
          this.reset();
        }
      }
      else if (this.state === FLIP) {
        this.state = FLAP;
        this.move();
      }
      else if (this.state === FLAP) {
        this.state = FLIP;
        this.move();
      }
    }
    this.draw();
  }

  draw() {
    const col = this.state === EXPLODING ? 'yellow' : INVADER;
    let s = this.sprites[this.state];
    for (var y = 0; y < s.length; y++) {
      for (var x = 0; x < s[y].length; x++) {
        if (s[y][x] === 1) {
          this.game.world[this.x + x][this.y + y] = col;
        }
      }
    }
  }
}

class Defender {
  constructor(game) {
    this.game = game;
    this.x = this.game.dim() / 2;
    this.y = this.game.dim() - 2;
    this.move = 0;
    this.delay = 0;
  }

  simulate() {
    if (this.delay-- <= 0) {
      this.delay = 2;
      if (this.move === 0) {
        this.move = this.game.getRandom(this.x * -1 + 1, this.game.dim() - 2 - this.x);
      }
      else if (this.move > 0) {
        this.x++;
        this.move--;
      }
      else {
        this.x--;
        this.move++;
      }

      if (!this.game.projectile.fired && this.game.invader.state !== EXPLODING && this.game.getRandom(0, 6) === 3) {
        this.game.projectile.fire(this.x, this.y);
      }
    }
    this.draw();
  }

  draw() {
    const col = 'white';
    this.game.world[this.x][this.y] = col;
    this.game.world[this.x - 1][this.y + 1] = col;
    this.game.world[this.x + 0][this.y + 1] = col;
    this.game.world[this.x + 1][this.y + 1] = col;
  }
}

class Projectile {
  constructor(game) {
    this.game = game;
    this.fired = false;
  }

  fire(x, y) {
    this.x = x;
    this.y = y;
    this.fired = true;
  }

  simulate() {
    if (this.fired) {
      if (this.y === 0) {
        this.fired = false;
      }
      else if (this.game.world[this.x][this.y] === INVADER) {
        this.fired = false;
        this.game.invader.state = EXPLODING;
        this.game.invader.explodingDelay = 3;
        this.game.rounds++;
      }
      else {
        this.y -= 2;
        this.draw();
      }
    }
  }

  draw() {
    const col = 'red';
    this.game.world[this.x][this.y - 1] = col;
    this.game.world[this.x][this.y] = col;
  }
}


class SpaceInvaders extends BaseGame {  
  constructor() {
    super();
  }

  getInterval() {
    return 100;
  }
   
  init() {
    super.init();
    this.defender = new Defender(this);
    this.projectile = new Projectile(this);
    this.invader = new Invader(this);
    this.reset();
  }
  
  isOver() {
    return this.rounds === 10;
  }
  
  reset() {
    this.rounds = 0
  }  
  
  simulate() {
    this.clear('darkblue');
    this.defender.simulate();
    this.invader.simulate();
    this.projectile.simulate();
  }
}

module.exports = SpaceInvaders;