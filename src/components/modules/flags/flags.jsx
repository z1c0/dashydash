'use strict';
var EmojiAndText = require('../../common/emojiAndText.jsx');

//https://emoji.codes/

const flagList = [
  [ 'ÖSTERREICH', 'flag_at' ],
  [ 'ITALIEN', 'flag_it' ],
  [ 'DEUTSCHLAND', 'flag_de' ],
  [ 'IRLAND', 'flag_ie' ],
  [ 'USA', 'flag_us' ],
  [ 'FRANKREICH', 'flag_fr' ],
  [ 'BRASILIEN', 'flag_br' ],
  [ 'KANADA', 'flag_ca' ],
  [ 'SCHWEIZ', 'flag_ch' ],
  [ 'SPANIEN', 'flag_es' ],
  [ 'EU', 'flag_eu' ],
  [ 'GROSSBRITTANIEN', 'flag_gb' ],
  [ 'JAPAN', 'flag_jp' ],
  [ 'SCHWEDEN', 'flag_se' ],
];


class Flags extends EmojiAndText {
  constructor(props) {
    super(props);
    this.list = flagList;
    this.scaleFactor = 0.1;
  }
};

module.exports = Flags;
