'use strict';
var Cursor = require('../common/misc.jsx').Cursor;
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
var Words = require('../modules/words/words.jsx');
var Recipe = require('../modules/recipe/recipe.jsx');
var ToDo = require('../modules/todo/todo.jsx');
var Numbers = require('../modules/numbers/numbers.jsx');
var misc  = require('../common/misc.jsx');
var BoardManager = require('./boardManager.jsx');



class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      modules: [],
      pos : [0, 0, 0, 0]
    };
  }

  switchToBoard(board) {
    //console.log(board);
    if (board) {
      setTimeout(() => {
        this.switchToBoard(this.boards.next());
      }, board.timeout);

      this.setState({ 
        modules: []
      });
      this.setState({ 
        name : board.name,
        modules : board.modules,
        pos : board.pos
      });
    }
  }

  componentDidMount() {
    const boardSetId = this.props.match.params.boardSetId;
    this.boards = new Cursor(new BoardManager().getBoards(boardSetId));
    const boardId = this.props.match.params.boardId;
    const index = this.boards.array().findIndex(b => b.name === boardId);
    this.switchToBoard(this.boards.current(index));
  }
  
  render() {
    const createPart = function(moduleInfo) {
      //console.log(moduleInfo);
      let name = moduleInfo.name;
      if (name.indexOf('.')) {
        name = name.split('.')[0];
      }
      const gridPos = {
        gridColumn : moduleInfo.pos[0],
        gridRow : moduleInfo.pos[1],
        gridColumnEnd: moduleInfo.pos[0] + moduleInfo.pos[2],
        gridRowEnd: moduleInfo.pos[1] + moduleInfo.pos[3],
      }
      
      var Module = require('../modules/' + name + '/' + name + '.jsx');
      return (
        <div key={moduleInfo.name} className="part" style={gridPos}>
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