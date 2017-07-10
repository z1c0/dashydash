"use strict";
var React = require('react');
var moment = require('moment');
var info = require('./timeOfDayInfo.jsx');

class TimeOfDay extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text : '',
      emoji : '',
      image : ''
    }
  }

  render() {
    var divStyle = {
      backgroundImage: 'url(' + this.state.image + ')'
    }
    return (
      <div id='timeofday'>
        <p>
          <span>{this.state.text}</span>
          <i className={this.state.emoji}></i>
        </p>
        <div className="gif" style={divStyle}>
        </div>
      </div>
    );
  }

  update() {
    const self = this;
    const data = info.get();
    const opts = {
      method: 'GET'
    };
    const giphyUrl = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=pg&tag=' + data.tag;
    fetch(giphyUrl, opts).then(function(response) {
      return response.json();
    })
    .then(function(body) {
      self.setState({
        image : body.data.fixed_width_downsampled_url,
        text : data.text,
        emoji : data.emoji,
      });
    })
    .catch(function(error) {
      console.log('Error: ', error);
    });
  }

  componentDidMount() {
    this.intervalId = setInterval(this.update, moment.duration(30, 'seconds'));
    this.update();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
}

module.exports = TimeOfDay;
