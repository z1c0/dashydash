"use strict";
var React = require('react');
var moment = require('moment');
var FetchModule = require('../../common/fetchModule.jsx');


class StarWars extends FetchModule {
  constructor(props){
    super(props);
    this.state = {
      text : '',
      author : '',
      image: '',
    }
    this.interval = moment.duration(1, 'minute');
    this.callback = function(body) {
      this.setState({
        text : body.text,
        author : body.author,
        image : body.image,
      });
    }
  }

  render() {
    var style = {
      backgroundImage: 'url(' + this.state.image + ')'
    }
    return (
      <div className='starwars' style={style}>
        <div className='starwars-overlay'>
          <blockquote>
            <p className="quote padded big-text">{this.state.text}</p>
          </blockquote>
          <cite className="author normal-text">{this.state.author}</cite>
        </div>
      </div>
    );
  }
};

module.exports = StarWars;
