'use strict';
var React = require('react');
var moment = require('moment');
var misc = require('./misc.jsx');


class EmojiAndText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index : 0
    }
    this.appearText = true;
    this.theme = misc.getRandomTheme();
  }

  componentDidMount() {
    const div = this.refs.emojiAndText;
    div.style.fontSize = 0.175 * div.clientWidth + 'px';

    const self = this;
    this.intervalId = setInterval(function() {
      self.setState({
        index : (self.state.index + 1) % self.list.length
      });
    }, moment.duration(30, 'seconds'));
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  

  render() {
    this.list = misc.shuffle(this.list);
    const l = this.list[this.state.index];
    return (
      <div ref='emojiAndText' className={'emojiAndText ' + this.theme}>
        <p className={this.appearText === true ? 'animate-appear' : ''}>{l[0].toUpperCase()}</p>
        <i key={l[1]} className={(this.appearText === false ? 'animate-appear' : '') + ' e1a-' + l[1]}></i>
      </div>
    );
  }
};

module.exports = EmojiAndText;
