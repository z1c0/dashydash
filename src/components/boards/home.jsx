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
        <div key={board.name}>
          <Link to={{ pathname : '/board/' + board.name }}>{board.name}</Link>
        </div>
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