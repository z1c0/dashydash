"use strict";
var React = require('react');
var moment = require('moment');
var FetchModule = require('../fetchModule.jsx');


class Blog extends FetchModule {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      image: ''
    }
    this.interval = moment.duration(1, 'hour');
    this.callback = function(body) {
      this.setState({
        title : body[0].title,
        image : body[0].featuredImage,
      });
    }
  }

  render() {
    return (
      <div id='blog'>
        <h2>{this.state.title}</h2>
        <img src={this.state.image}/>
      </div>
    );
  }
};

module.exports = Blog;
