'use strict';
var EmojiAndText = require('../../common/emojiAndText.jsx');

//https://emoji.codes/

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
  [ 'Ente', 'duck' ],
  [ 'Fisch', 'fish' ],
  [ 'Hallo', 'wave' ],
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
  [ 'Ziel', 'checkered_flag' ]
];


class Words extends EmojiAndText {
  constructor(props) {
    super(props);
    this.list = wordList;
    this.appearText = false;
  }
};

module.exports = Words;
