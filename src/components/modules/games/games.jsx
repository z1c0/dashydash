'use strict';
var React = require('react');
var GameController = require('./gameController.jsx');

class Games extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div ref="games" id="games">
        <canvas ref="gamesCanvas" width="0" height="0">
        </canvas>
      </div>
    );
  }  

  componentDidMount() {
    const div = this.refs.games;
    const w = Math.min(div.clientWidth, div.clientHeight);
    const canvas = this.refs.gamesCanvas;
    canvas.style.width = w;
    canvas.style.height = w;
    canvas.style.marginLeft = ((div.clientWidth - w) / 2) + 'px'; 
    canvas.width = w;
    canvas.height = w;

    this.gameController = new GameController(canvas);
    this.gameController.nextGame();
  }

  componentWillUnmount() {
    this.gameController.clear();
  }  
}

module.exports = Games;
