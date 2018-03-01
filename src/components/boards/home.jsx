'use strict';
var React = require('react');
var RouterDOM = require('react-router-dom');
var Link = RouterDOM.Link;
var BoardManager = require('./boardManager.jsx');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards : []
    };
  }

  componentDidMount() {
    this.boardSet = this.props.match.params.boardSetId || 'default';
    this.setState({ 
      boards : new BoardManager().getBoards(this.boardSet)
    });  
  }

  render() {
    var createTile = function(board) {
      return (
        <Link key={board.name} className="tile" to={{ pathname : '/' + this.boardSet + '/' + board.name }}>
          <i className={"fa " + board.icon + " fa-3x"}></i>
          <p className="padded big-text">{board.name}</p>
        </Link>
      );
    };

    return (
      <div>
        <div>
          {this.state.boards.map(createTile, this)}
        </div>
       </div>
    );
  }
};

module.exports = Home;