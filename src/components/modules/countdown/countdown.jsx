const React = require('react');
const moment = require('moment');
const misc = require('../../common/misc.jsx');
const allEvents = [
  { title: "Weihnachten",
    date: moment('2020-12-24', 'YYYY-MM-DD'),
    emoji: 'santa'
  },
];

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.theEvent = allEvents.sort((e1, e2) => this.getDayDiff(e1) - this.getDayDiff(e2)).filter(e => this.getDayDiff(e) >= 0)[0];
    this.theme = misc.getRandomTheme();
  }

  getDayDiff(e) {
    const today = moment().startOf("day").toDate();
    const days = e.date.diff(today, 'days');
    return moment.duration(days, 'days').asDays();
  }

  render() {
    const days = Math.max(0, this.getDayDiff(this.theEvent));
    return (
      <div className={'countdown ' + this.theme}>
        <div>
          <p><span className='normal-text half-transparent-text'>noch&nbsp;</span><span className='bold-text icon-text'>{days}</span><span className='normal-text half-transparent-text'>&nbsp;Tage</span></p>
          <p><span className='normal-text half-transparent-text'>bis&nbsp;</span><span className="bold-text big-text">{this.theEvent.title}</span><i className={'padded biggest-text e1a-' + this.theEvent.emoji}></i></p>
        </div>
      </div>
    );
  }
};

module.exports = Countdown