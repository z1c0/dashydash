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
      //console.log(body);
      this.setState({
        items : body.sort((a, b) => {
          const large = moment().add(10, 'years');
          const dta = a.due ? moment(a.due.date) : large;
          const dtb = b.due ? moment(b.due.date) : large;
          return dta.diff(dtb);
        })
      });
    }
  }

  render() {
    var createItem = function(item, i) {
      let dotClass = 'e1a-white_circle';
      if (item.due) {
        const days = Math.round(moment.duration(moment(item.due.date).diff(moment())).asDays());
        if (days <= 3) {
          dotClass = 'e1a-red_circle';
        }
      }
      return (
        <li key={i} className='todoItem'>
          <span><i className={dotClass}></i>{item.content}</span>
        </li>);
    };

    return (
      <div id='todo'>
        <h1 className="big-text"><i className="e1a-clipboard"></i>TODO</h1>
        <ul className="small-text">
          { this.state.items.map(createItem, this) }
        </ul>
      </div>
    );
  }
};

module.exports = ToDo;
