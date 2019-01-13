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
    this.scaleFactor = 0.175
  }

  componentDidMount() {
    const div = this.refs.emojiAndText;
    div.style.fontSize = this.scaleFactor * div.clientWidth + 'px';

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
    let top;
    let bottom;
    if (this.appearText) {
      top = <i key={l[1] + '-emoji'} className={'e1a-' + l[1]}></i>
      bottom = <p key={l[1] + '-text'} className='animate-appear'>{l[0].toUpperCase()}</p>
    }
    else {
      top = <p key={l[1] + '-text'}>{l[0].toUpperCase()}</p>
      bottom = <i key={l[1] + '-emoji'} className={'animate-appear e1a-' + l[1]}></i>
    }
    return (
      <div ref='emojiAndText' className={'emojiAndText ' + this.theme}>
        {top}
        {bottom}
      </div>
    );
  }
};

module.exports = EmojiAndText;
