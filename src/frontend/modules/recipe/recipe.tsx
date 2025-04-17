'use strict';
var React = require('react');
var moment = require('moment');
var FetchModule = require('../../common/fetchModule.jsx');
const Blinkable = require('../../common/blinkable.jsx');


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
        image : result.image,
        url : result.url
      });
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // TODO: move into "base class"
    const opts = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({ 
        title : this.state.title,
        image : this.state.image,
        url : this.state.url,
      })
    };
    const url = '/api/' + this.constructor.name.lowercaseFirst();
    let self = this;
    fetch(url, opts).then(response => {
      return response.json();
    })
    .then(body => {
      //console.log(body);
    })
    .catch(error => {
      console.log('Post error: ', error);
    });

  }

  render() {
    const style = {
      backgroundImage: 'url(' + this.state.image + ')'
    }
    return (
      <div className='recipe' style={style} onClick={this.handleClick}>
        <Blinkable>
          <p className="padded bold-text">{this.state.title}</p>
          <p className="padded small-text">{this.state.text}</p>
        </Blinkable>
      </div>
    );
  }
};

module.exports = Recipe;
