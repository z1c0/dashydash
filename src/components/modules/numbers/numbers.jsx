"use strict";
var React = require('react');
var moment = require('moment');
var misc = require('../../common/misc.jsx');


class Numbers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn : 0,
      n1 : 1,
      n2 : 1,
      result : 2,
      theme : misc.getRandomTheme()
    }
    this.theme = misc.getRandomTheme();
  }

  componentDidMount() {
    const div = this.refs.numbers;
    div.style.fontSize = 0.19 * div.clientWidth + 'px';

    const self = this;
    this.intervalId = misc.setIntervalAndExecute(() => {
      let n1 = misc.randomIntFromInterval(1, 6);
      let n2 = misc.randomIntFromInterval(1, 3);
      if (misc.randomBoolean()) {
        n2 = [n1, n1 = n2][0];
      }
      self.setState({
        turn : this.state.turn + 1,
        n1 : n1,
        n2 : n2,
        result : n1 + n2
      });
    }, moment.duration(20, 'seconds'));
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  

  render() {
    return (
      <div id='numbers' ref='numbers' className={this.theme}>
        <p>
          <span className='number'>{this.state.n1}</span>
          <span className='symbol'>+</span>
          <span className='number'>{this.state.n2}</span>
          <span className='symbol'>=</span>
          <span key={this.state.turn} className='number result'>{this.state.result}</span>
        </p>
      </div>
    );
  }
};

module.exports = Numbers;
