"use strict";
var React = require('react');
var moment = require('moment');
var FetchModule = require('../../common/fetchModule.jsx');


class News extends FetchModule {
  constructor(props) {
    super(props);
    this.state = {
      title : '',
      description : '',
      image : ''
    }
    this.interval = moment.duration(30, 'seconds');
    this.callback = function(body) {
      this.setState({ 
        title : body.title,
        description : body.description,
        image : body.urlToImage
      });
    }
  }

  render() {
    return (
      <div id='news' style={{ backgroundImage: 'url(' + this.state.image + ')' }}>
        <div className="articleText">
          <h1>{this.state.title}</h1>
          <p>{this.state.description}</p>
        </div>
      </div>
    );
  }
};

module.exports = News;
