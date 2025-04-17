const React = require('react');
const moment = require('moment');
const misc = require('../../common/misc.jsx');

class Vocab extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props)
        if (props.config === 'spanish') {
            this.words = require('./spanish.json');
            this.flagIcon = 'e1a-flag_es';
        }
        else if (props.config === 'italian') {
            this.words = require('./italian.json');
            this.flagIcon = 'e1a-flag_it';
        }
    }

    componentDidMount() {
        const self = this;
        this.intervalId = setInterval(() => self.forceUpdate(), moment.duration(10, 'seconds'));
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        let word = misc.getRandomElement(this.words);
        word = misc.shuffle(word);
        return (
            <div className='vocab big-text'>
                <p>{word[0]}</p>
                <p className='flagicon icon-text'><i className={this.flagIcon}></i></p>
                <p key={word[1]} className='animate-appear'>{word[1]}</p>
            </div>
        );
    }
};

module.exports = Vocab