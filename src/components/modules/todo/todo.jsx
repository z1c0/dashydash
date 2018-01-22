'use strict';
var React = require('react');
var moment = require('moment');
var FetchModule = require('../../common/fetchModule.jsx');


class ToDo extends FetchModule {
  constructor(props) {
    super(props);
    this.state = {
      items : []
    }
    this.interval = moment.duration(30, 'minutes');
    this.callback = function(body) {
      this.setState({ 
        items : body
      });
    }
  }

  render() {
    var createItem = function(item, i) {
      return (
        <li key={i} className='todoItem'>
          <span><i className="e1a-white_circle"></i>{item.content}</span>
        </li>);
    };
    
    return (
      <div id='todo'>
        <h2><i className="e1a-clipboard"></i>TODO</h2>
        <ul>
          { this.state.items.map(createItem, this) }
        </ul>
      </div>
    );
  }
};

module.exports = ToDo;
