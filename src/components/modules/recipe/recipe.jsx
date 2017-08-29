'use strict';
var React = require('react');
var moment = require('moment');
var FetchModule = require('../../common/fetchModule.jsx');


class Recipe extends FetchModule {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      text: '',
      image: ''
    }
    this.interval = moment.duration(2, 'hours');
    this.callback = function(result) {
      this.setState({
        title : result.title,
        text : result.text,
        image : result.image
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
          <p className="padded small-text">{this.state.text}</p>
        </div>
      </div>
    );
  }
};

module.exports = Recipe;
