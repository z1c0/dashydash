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


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      modules: []
    };
  }

  componentDidMount() {
    let id = this.props.match.params.boardId;
    let board = require('./boardManager.jsx').getBoard(id);
    //console.log(board);
    if (board) {
      this.setState({ 
        name : board.name,
        modules : board.modules
      });
    }
  }
  
  render() {
    var createModule = function(moduleInfo) {
      const name = moduleInfo.name;
      var Module = require('../modules/' + name + '/' + name + '.jsx');
      return <Module key={name} id={name}/>
    };
    return (
      <div>
        {this.state.modules.map(createModule, this)}
      </div>
    );
  }
};

module.exports = Board;