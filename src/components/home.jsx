"use strict";

var React = require('react');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parts: []
    };
  }

  componentDidMount() {
    this.setState({ parts : [ 'bla', 'bli', 'blue' ]});
  }

  render() {
    var createPart = function(part) {
      return <h3 key={part}>{part}</h3>
    };

    return (
      <div>
        <h1>HUGO</h1>
        <p>lorem hugo abc</p>
        <div>
          <h2>parts</h2>
          {this.state.parts.map(createPart, this)}
        </div>
       </div>
    );
  }
};

module.exports = Home;