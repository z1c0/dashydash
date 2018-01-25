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
      <div className='timeofday'>
        <div className="giphy" style={divStyle}></div>
        <p>
          <span>{this.state.text}</span>
          <i className={this.state.emoji}></i>
        </p>
      </div>
    );
  }

  update() {
    let self = this;
    const data = info.get();
    const opts = {
      method: 'GET'
    };
    const giphyUrl = 'https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=pg&tag=' + data.tag;
    fetch(giphyUrl, opts).then(function(response) {
      return response.json();
    })
    .then(function(body) {
      self.setState({
        image : body.data.image_original_url,
        text : data.text,
        emoji : data.emoji,
      });
    })
    .catch(function(error) {
      console.log('Error: ', error);
    });
  }

  componentDidMount() {
    this.intervalId = setInterval(this.update.bind(this), moment.duration(30, 'seconds'));
    this.update();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
}

module.exports = TimeOfDay;
