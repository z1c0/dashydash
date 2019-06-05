const React = require('react');
const moment = require('moment');
const words = require('./spanish.json');
const misc = require('../../common/misc.jsx');

class Vocab extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const self = this;
        this.intervalId = setInterval(() => self.forceUpdate(), moment.duration(10, 'seconds'));
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        let word = misc.getRandomElement(words);
        word = misc.shuffle(word);
        return (
            <div className='vocab big-text'>
                <p>{word[0]}</p>
                <p className='flagicon icon-text'><i className='e1a-flag_es'></i></p>
                <p key={word[1]} className='animate-appear'>{word[1]}</p>
            </div>
        );
    }
};

module.exports = Vocab