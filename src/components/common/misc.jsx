'use strict';

function setIntervalAndExecute(f, t) {
  f();
  return setInterval(f, t);
}

function shuffle(o) {
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function randomBoolean() {
  return Math.random() >= 0.5;
}

function randomIntFromInterval(min, max) {
  // max inclusive
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomTheme() {
  return shuffle([
    'theme-dark1',
    'theme-dark2',
    'theme-light'
  ])[0];
}

module.exports = {
  setIntervalAndExecute : setIntervalAndExecute,
  shuffle : shuffle,
  randomIntFromInterval : randomIntFromInterval,
  randomBoolean : randomBoolean,
  getRandomTheme : getRandomTheme,

  Cursor : function(array) {
    var idx = 0;
    this.array = function() {
      return array;
    }
    this.previous = function() {
      idx = (!!idx ? idx : array.length) - 1;
      return array[idx];
    };
    this.current = function(i) {
      if (i) {
        idx = i;
      }
      return array[idx];
    };
    this.next = function() {
      idx = (idx + 1) % array.length;
      return array[idx];
    };
    this.isEmpty = function() {
      return array.length === 0;
    }
    return this;
  }
}