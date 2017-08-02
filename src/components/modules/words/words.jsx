"use strict";
var React = require('react');
var moment = require('moment');
var misc = require('../../common/misc.jsx');

const wordList = [
  [ 'Klo', 'toilet' ],
  [ 'Pizza', 'pizza' ],
  [ 'Herz', 'heart' ],
  [ 'Sonne', 'sunny' ],
  [ 'Katze', 'cat' ],
  [ 'Bad', 'bath_tone1' ],
  [ 'Ei', 'egg' ],
  [ 'Kiwi', 'kiwi' ],
  [ 'Uhu', 'owl' ],
  [ 'Bus', 'bus' ],
  [ 'Rose', 'rose' ],
  [ 'Hase', 'rabbit' ],
  [ 'Hund', 'dog' ],
  [ 'Maus', 'mouse' ],
  [ 'Tiger', 'tiger' ],
  [ 'Hose', 'jeans' ],
  [ 'Mund', 'lips' ],
  [ 'Hut', 'tophat' ],
  [ 'Pirat', 'skull_crossbones' ],
  [ 'Mond', 'full_moon_with_face' ],
  [ 'Auto', 'red_car' ],
  [ 'Taxi', 'taxi' ],
  [ 'Ball', 'soccer' ],
  [ 'Papa', 'man_tone1' ],
  [ 'Mama', 'woman_tone1' ],
  [ 'Tim',  'space_invader' ],
  [ 'Timo', 'boy_tone1' ],
  [ 'Nico', 'baby_tone1' ],
  [ 'Popo', 'peach' ],
  [ 'Kacka', 'poop' ],
  [ 'Affe', 'monkey_face' ],
  [ 'Fisch', 'fish' ],
  [ 'Nase', 'nose' ],
];


class Words extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index : 0
    }
    this.words = misc.shuffle(wordList);
  }

  componentDidMount() {
    const div = this.refs.words;
    div.style.fontSize = 0.175 * div.clientWidth + 'px';

    const self = this;
    this.intervalId = setInterval(function() {
      self.setState({
        index : (self.state.index + 1) % self.words.length
      });
    }, moment.duration(30, 'seconds'));
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  

  render() {
    var l = this.words[this.state.index];
    return (
      <div className='words' ref='words'>
        <p>{l[0].toUpperCase()}</p>
        <i key={l[1]} className={'e1a-' + l[1]}></i>
      </div>
    );
  }
};

module.exports = Words;
