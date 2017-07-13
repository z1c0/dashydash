"use strict";
var React = require('react');
var moment = require('moment');
var FetchModule = require('../../common/fetchModule.jsx');


class Blog extends FetchModule {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      image: '',
      text: '',
      published : ''
    }
    this.interval = moment.duration(1, 'hour');
    this.callback = function(body) {
      this.setState({
        title : body[0].title,
        image : body[0].featuredImage,
        text : body[0].description,
        published : moment.duration(moment(body[0].published).diff(moment())).humanize(true)
      });
    }
  }

  render() {
    var style = {
      backgroundImage: 'url(' + this.state.image + ')'
    }
    return (
      <div className='blog' style={style}>
        <div className='blog-overlay'>
          <p className="padded bold-text">{this.state.title}</p>
          <p className="padded small-text">[{this.state.published}]</p>
          <p className="padded small-text">{this.state.text}</p>
        </div>
      </div>
    );
  }
};

module.exports = Blog;
