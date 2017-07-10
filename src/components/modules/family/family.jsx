"use strict";
var React = require('react');
var moment = require('moment');
var FetchModule = require('../../common/fetchModule.jsx');


class Family extends FetchModule {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      text : '',
      image: '',
      done : false
    }
    this.interval = moment.duration(1, 'hour');
    this.callback = function(body) {
      var latest = body[body.length - 1];
      this.setState({
        title : latest.title,
        text : latest.text,
        image : latest.image,
        done : latest.done
      });
    }
  }

  render() {
    return (
      <div id='family'>
        <h2>{this.state.title}</h2>
        <p>{this.state.text}</p>
        <p>{this.state.done ? 'OK!' : ':-('}</p>
        <img src={this.state.image}/>
      </div>
    );
  }
};

module.exports = Family;
