'use strict';
var React = require('react');
var Weather = require('../modules/weather/weather.jsx');
var Blog = require('../modules/blog/blog.jsx');
var Bus = require('../modules/bus/bus.jsx');
var Birthday = require('../modules/birthdays/birthdays.jsx');
var TimeOfDay = require('../modules/timeofday/timeofday.jsx');
var Abc = require('../modules/abc/abc.jsx');
var Family = require('../modules/family/family.jsx');
var Appointments = require('../modules/appointments/appointments.jsx');
var Pics = require('../modules/pics/pics.jsx');
var Games = require('../modules/games/games.jsx');
var News = require('../modules/news/news.jsx');
var Football = require('../modules/football/football.jsx');


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      modules: [],
      pos : [0, 0, 0, 0]
    };
  }

  componentDidMount() {
    let id = this.props.match.params.boardId;
    let board = require('./boardManager.jsx').getBoard(id);
    //console.log(board);
    if (board) {
      this.setState({ 
        name : board.name,
        modules : board.modules,
        pos : board.pos
      });
    }
  }
  
  render() {
    const createPart = function(moduleInfo) {
      //console.log(moduleInfo);
      const name = moduleInfo.name;
      const gridPos = {
        gridColumn : moduleInfo.pos[0],
        gridRow : moduleInfo.pos[1],
        gridColumnEnd: moduleInfo.pos[0] + moduleInfo.pos[2],
        gridRowEnd: moduleInfo.pos[1] + moduleInfo.pos[3],
      }
      
      var Module = require('../modules/' + name + '/' + name + '.jsx');
      return (
        <div key={name} className="part" style={gridPos}>
          <Module/>
        </div>
      );
    };

    return (
      <div className="board">
        {this.state.modules.map(createPart, this)}
      </div>
    );
  }
};

module.exports = Board;