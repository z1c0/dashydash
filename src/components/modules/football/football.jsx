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
      info : ''
    }
    this.interval = moment.duration(1, 'hour');
    this.callback = function(matches) {
      let m = matches.find(m => {
        return m.Team1.ShortName === 'BVB' || m.Team2.ShortName === 'BVB';
      });
      if (m) {
        let info = '';
        if (m.MatchIsFinished) {
          info = m.MatchResults[1].PointsTeam1 + ' : ' + m.MatchResults[1].PointsTeam2;
        }
        else {
          info = moment(m.MatchDateTime).format("dd, DD.MM.YYYY, HH:mm")
        }
        this.setState({
          team1 : m.Team1.ShortName || m.Team1.TeamName,
          icon1 : m.Team1.TeamIconUrl,
          team2 : m.Team2.ShortName || m.Team2.TeamName,
          icon2 : m.Team2.TeamIconUrl,
          info : info
        });
      }
    }
  }

  render() {
    return (
      <div className='football'>
        <p>
          <span className='padded bold-text'>{this.state.team1}</span>
          <span className='teamLogo' style={{ backgroundImage: 'url(' + this.state.icon1 + ')' }}></span>
        </p>
        <p className='padded small-text'>vs.</p>
        <p>
          <span className='padded bold-text'>{this.state.team2}</span>
          <span className='teamLogo' style={{ backgroundImage: 'url(' + this.state.icon2 + ')' }}></span>
        </p>
        <br/>
        <p>{this.state.info}</p>
      </div>
    );
  }
};

module.exports = Football;
