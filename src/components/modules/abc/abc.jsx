"use strict";
var React = require('react');
var moment = require('moment');

const letters = [
  [ 'A', 'apple' ],
  [ 'B', 'banana' ],
  [ 'C', 'clown' ],
  [ 'D', 'dolphin' ],
  [ 'E', 'elephant' ],
  [ 'F', 'fish' ],
  [ 'G', 'guitar' ],
  [ 'H', 'house_with_garden' ],
  [ 'I', 'flag_it' ],
  [ 'J', 'flag_jp' ],
  [ 'K', 'camel' ],
  [ 'L', 'lion_face' ],
  [ 'M', 'mouse2' ],
  [ 'N', 'nose_tone1' ],
  [ 'O', 'ear_tone1' ],
  [ 'P', 'penguin' ],
  [ 'Q', 'frog' ],
  [ 'R', 'rocket' ],
  [ 'S', 'snake' ],
  [ 'T', 'taxi' ],
  [ 'U', 'metro' ],
  [ 'V', 'bird' ],
  [ 'W', 'whale' ],
  [ 'X', 'negative_squared_cross_mark' ],
  [ 'Y', 'regional_indicator_y' ],
  [ 'Z', 'checkered_flag' ],
];


class Abc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index : 0
    }
  }

  componentDidMount() {
    const self = this;
    setInterval(function() {
      self.setState({
        index : (self.state.index + 1) % letters.length
      });
    }, moment.duration(10, 'seconds'));
  }

  render() {
    var l = letters[this.state.index];
    return (
      <div id='abc'>
        <p>
          <span>{l[0]}</span>
          <i className={'e1a-' + l[1]}></i>
        </p>
      </div>
    );
  }
};

module.exports = Abc;
