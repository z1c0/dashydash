'use strict';
var React = require('react');
var moment = require('moment');
var FetchModule = require('../../common/fetchModule.jsx');


class Football extends FetchModule {
  constructor(props){
    super(props);
    this.state = {
      team1 : '',
      icon1 : '',
      team2 : '',
      icon2 : '',
      date : ''
    }
    this.interval = moment.duration(1, 'hour');
    this.callback = function(matches) {
      let m = matches.find(m => {
        return m.Team1.ShortName === 'BVB' || m.Team2.ShortName === 'BVB';
      });
      if (m) {
        this.setState({
          team1 : m.Team1.ShortName || m.Team1.TeamName,
          icon1 : m.Team1.TeamIconUrl,
          team2 : m.Team2.ShortName || m.Team2.TeamName,
          icon2 : m.Team2.TeamIconUrl,
          date : moment(m.MatchDateTime).format("dd, DD.MM.YYYY, HH:mm")
        });
      }
    }
  }

  render() {
    return (
      <div className='football'>
        <p className='padded bold-text'>{this.state.team1}</p>
        <p style={{ backgroundImage: 'url(' + this.state.icon1 + ')' }}>&nbsp;</p>
        <p className='padded small-text'>vs.</p>
        <p style={{ backgroundImage: 'url(' + this.state.icon2 + ')' }}>&nbsp;</p>
        <p className='padded bold-text'>{this.state.team2}</p>
        <p className='small-text'>{this.state.date}</p>
      </div>
    );
  }
};

module.exports = Football;
