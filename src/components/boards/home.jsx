'use strict';
var React = require('react');
var RouterDOM = require('react-router-dom');
var Link = RouterDOM.Link;


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boards : []
    };
  }

  componentDidMount() {
    this.setState({ 
      boards : require('./boardManager.jsx').getBoards()
    });  
  }

  render() {
    var createTile = function(board) {
      return (
        <Link key={board.name} className="tile" to={{ pathname : '/board/' + board.name }}>
          <i className={"fa " + board.icon + " fa-5x"}></i>
          <h3>{board.name}</h3>
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