const React = require('react');
const moment = require('moment');
const misc = require('../../common/misc.jsx');
const theEvent = {
  title: "Schulbeginn",
  date: moment('2019-09-09', 'YYYY-MM-DD')
}

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.theme = misc.getRandomTheme();
  }

  render() {
    const today = moment().startOf("day").toDate();
    const days = Math.max(0, moment.duration(theEvent.date.diff(moment(today))).asDays());
    return (
      <div className={'countdown ' + this.theme}>
        <div>
          <p><span className='normal-text half-transparent-text'>noch&nbsp;</span><span className='bold-text icon-text'>{days}</span><span className='normal-text half-transparent-text'>&nbsp;Tage</span></p>
          <p><span className='normal-text half-transparent-text'>bis&nbsp;</span><span className="bold-text big-text">{theEvent.title}</span></p>
        </div>
      </div>
    );
  }
};

module.exports = Countdown