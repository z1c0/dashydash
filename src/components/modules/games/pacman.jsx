'use strict';
var BaseGame = require('./baseGame.jsx');

function createGhostFrame(M, flip) {
  let _ = "";
  let o = "white";
  let X = "#000dfe"
  let frame = [
    [_, _, _, _, _, M, M, M, M, _, _, _, _, _ ],
    [_, _, _, M, M, M, M, M, M, M, M, _, _, _ ],
    [_, _, M, M, M, M, M, M, M, M, M, M, _, _ ],
    [_, M, M, M, o, o, M, M, M, M, o, o, M, _ ],
    [_, M, M, o, o, o, o, M, M, o, o, o, o, _ ],
    [_, M, M, o, o, X, X, M, M, o, o, X, X, _ ],
    [M, M, M, o, o, X, X, M, M, o, o, X, X, M ],
    [M, M, M, M, o, o, M, M, M, M, o, o, M, M ],
    [M, M, M, M, M, M, M, M, M, M, M, M, M, M ],
    [M, M, M, M, M, M, M, M, M, M, M, M, M, M ],
    [M, M, M, M, M, M, M, M, M, M, M, M, M, M ],
    [M, M, M, M, M, M, M, M, M, M, M, M, M, M ],
    [M, M, M, M, M, M, M, M, M, M, M, M, M, M ],
    [M, M, M, M, M, M, M, M, M, M, M, M, M, M ],
    [M, M, M, M, _, M, M, M, M, _, M, M, M, M ],
    [_, M, M, _, _, _, M, M, _, _, _, M, M, _ ],
  ];
  if (flip) {
    frame.forEach(l => l.reverse());
  }
  return frame;
}

class Ghost {
  constructor(game, color, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.frame = x > 1 ? 0 : 1;
    this.sprites = [
      createGhostFrame(color, false),
      createGhostFrame(color, true)
    ];
  }

  simulate() {
    this.draw();
  }

  draw() {
    let s = this.sprites[this.frame];
    for (var y = 0; y < s.length; y++) {
      for (var x = 0; x < s[y].length; x++) {
        let c = s[y][x];
        if (c) {
          this.game.world[this.x + x][this.y + y] = c;
        }
      }
    }
    this.frame = (this.frame + 1) % this.sprites.length;
  }
}

class PacMan extends BaseGame {  
  constructor() {
    super();
  }

  getInterval() {
    return 750;
  }
   
  init() {
    super.init();
    this.sprites = [
       new Ghost(this, this.getRandomBool() ? "#fe0e00" : "#ff8113", 1 , 1),
       new Ghost(this, this.getRandomBool() ? "#15fffe" : "#fd98ca", 15, 15),
      ];
    this.reset();
  }
  
  isOver() {
    return this.rounds === 100;
  }
  
  reset() {
    this.rounds = 0
  }
  
  simulate() {
    this.clear('#222222');
    this.sprites.forEach(s => {
      s.simulate();
    });
    this.rounds++;
  }
}

module.exports = PacMan;