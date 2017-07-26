"use strict";
var React = require('react');
var moment = require('moment');

const words = [
  [ 'Auto', 'car' ],
];


class Words extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index : 0
    }
  }

  componentDidMount() {
    const div = this.refs.words;
    div.style.fontSize = 0.25 * div.clientWidth + 'px';

    const self = this;
    this.intervalId = setInterval(function() {
      self.setState({
        index : (self.state.index + 1) % words.length
      });
    }, moment.duration(15, 'seconds'));
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  

  render() {
    var l = letters[this.state.index];
    return (
      <div className='words' ref='words'>
        <p>
          <span>{l[0]}</span>
          <i className={'e1a-' + l[1]}></i>
        </p>
      </div>
    );
  }
};

module.exports = Words;
