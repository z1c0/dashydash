'use strict';
var React = require('react');
var moment = require('moment');
var misc = require('../../common/misc.jsx');

const wordList = [
  [ 'Auto', 'red_car' ],
  [ 'Affe', 'monkey_face' ],
  [ 'Ampel', 'vertical_traffic_light' ],
  [ 'Bad', 'bath_tone1' ],
  [ 'Ball', 'soccer' ],
  [ 'Benni', 'boy_tone1' ],
  [ 'Bus', 'bus' ],
  [ 'Ei', 'egg' ],
  [ 'Eis', 'icecream' ],
  [ 'Fisch', 'fish' ],
  [ 'Hase', 'rabbit' ],
  [ 'Herz', 'heart' ],
  [ 'Hose', 'jeans' ],
  [ 'Hund', 'dog' ],
  [ 'Hut', 'tophat' ],
  [ 'Kathi', 'girl_tone1' ],
  [ 'Katze', 'cat' ],
  [ 'Kino', 'film_frames' ],
  [ 'Kiwi', 'kiwi' ],
  [ 'Kacka', 'poop' ],
  [ 'Klo', 'toilet' ],
  [ 'Lolli', 'lollipop' ],
  [ 'Mama', 'woman_tone1' ],
  [ 'Maus', 'mouse' ],
  [ 'Mond', 'full_moon_with_face' ],
  [ 'Mund', 'lips' ],
  [ 'Nase', 'nose' ],
  [ 'Nico', 'baby_tone1' ],
  [ 'Oma', 'older_woman_tone1' ],
  [ 'Opa', 'older_man_tone1' ],
  [ 'Pirat', 'skull_crossbones' ],
  [ 'Popo', 'peach' ],
  [ 'Pizza', 'pizza' ],
  [ 'Radio', 'radio' ],
  [ 'Rose', 'rose' ],
  [ 'Sonne', 'sunny' ],
  [ 'Taxi', 'taxi' ],
  [ 'Tiger', 'tiger' ],
  [ 'Tim',  'space_invader' ],
  [ 'Timo', 'boy_tone1' ],
  [ 'Uhu', 'owl' ],
  [ 'Vulkan', 'volcano' ],
  [ 'Ziel', 'checkered_flag' ],
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
