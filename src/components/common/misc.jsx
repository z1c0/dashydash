'use strict';

function setIntervalAndExecute(f, t) {
  f();
  return setInterval(f, t);
}

module.exports = {
  setIntervalAndExecute : setIntervalAndExecute,

  Cursor : function(array) {
    var idx = 0;
    this.array = function() {
      return array;
    }
    this.previous = function () {
      idx = (!!idx ? idx : array.length) - 1;
      return array[idx];
    };
    this.current = function () {
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