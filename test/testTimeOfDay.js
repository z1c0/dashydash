'use strict';
var info = require('../src/components/modules/timeofday/timeOfDayInfo');
var assert = require('chai').assert;
var expect = require('chai').expect;


function helper_SpecialTimeOfDay(day, month, hour) {
  var d = new Date(2016, month - 1, day);
  d.setHours(hour);
  return d;
}

function helper_SpecialDay(day, month) {
  return helper_SpecialTimeOfDay(day, month, 12);
}

function helper_TimeOfDay(hour) {
  var d = helper_WeekDay(2);
  d.setHours(hour);
  return d;
}

function helper_WeekDay(day) {
  return new Date(2016, 10, 20 + day);
}

function helper_TimeOfWeekDay(day, hour){
  var d = helper_WeekDay(day);
  d.setHours(hour);
  return d;
}

describe('timeOfDayInfo', function() {
    var tests = [
      { arg: helper_SpecialDay(25, 10), expected: 'PastaDay' },
      { arg: helper_SpecialDay( 2,  2), expected: 'GroundhogDay' },
      { arg: helper_SpecialDay(14,  2), expected: 'Valentine' },
      { arg: helper_SpecialDay(17,  3), expected: 'PaddysDay' },
      { arg: helper_SpecialDay(14,  3), expected: 'PiDay' },
      { arg: helper_SpecialDay(22,  4), expected: 'EarthDay' },
      { arg: helper_SpecialDay( 4,  5), expected: 'StarWars' },
      { arg: helper_SpecialDay(25,  5), expected: 'TowelDay' },
      { arg: helper_SpecialDay( 8,  8), expected: 'CatDay' },
      { arg: helper_SpecialDay(19,  9), expected: 'PirateDay' },
      { arg: helper_SpecialDay(31, 10), expected: 'Halloween' },
      { arg: helper_SpecialDay( 6, 12), expected: 'Nikolaus' },
      { arg: helper_SpecialDay(24, 12), expected: 'XMAS' },
      { arg: helper_SpecialDay(31, 12), expected: 'Sylvester' },
      { arg: helper_SpecialDay( 1,  1), expected: 'NewYear' },
      { arg: helper_SpecialDay( 3,  9), expected: 'WeddingDay' },
      { arg: helper_SpecialDay(23,  2), expected: 'Steffi' },
      { arg: helper_SpecialDay(10,  3), expected: 'Wolfgang' },
      { arg: helper_SpecialDay(16, 10), expected: 'Timo' },
      { arg: helper_SpecialDay( 2, 12), expected: 'Nico' },

      { arg: helper_TimeOfWeekDay(1,  6), expected: 'Workout' },
      { arg: helper_TimeOfWeekDay(3,  6), expected: 'Workout' },
      { arg: helper_TimeOfWeekDay(5,  6), expected: 'Workout' },
      { arg: helper_TimeOfWeekDay(0,  8), expected: 'Breakfast' },
      { arg: helper_TimeOfWeekDay(6, 10), expected: 'Breakfast' },

      { arg: helper_TimeOfDay(0), expected: 'Night' },
      { arg: helper_TimeOfDay(7), expected: 'GoodMorning' },
      { arg: helper_TimeOfDay(12), expected: 'Lunch' },
      { arg: helper_TimeOfDay(15), expected: 'Afternoon' },
      { arg: helper_TimeOfDay(19), expected: 'BedTime' },
      { arg: helper_TimeOfDay(18), expected: 'Evening' },

      { arg: helper_TimeOfWeekDay(5, 12), expected: 'BurritoFriday' },
      { arg: helper_TimeOfWeekDay(6, 11), expected: 'Weekend' },
      { arg: helper_TimeOfWeekDay(0, 16), expected: 'Weekend' },
      { arg: helper_SpecialTimeOfDay(1, 12, 17), expected: 'Advent' },
      { arg: helper_SpecialTimeOfDay(23, 12, 19), expected: 'Advent' },
      { arg: helper_SpecialTimeOfDay(10, 12, 8), expected: 'XmasCalendar' },
      { arg: helper_SpecialTimeOfDay(17, 9, 19), expected: 'Bundesliga' },
    ];


  describe('getMatches()', function() {
    tests.forEach(function(test) {
      it(test.expected + ' matches at least once', function() {
        const matches = info.getMatches(test.arg);
        assert.isAtLeast(matches.length, 1);
      });

      it(test.expected +  ' match has valid text property', function() {
        info.getMatches(test.arg).forEach(m => {
          expect(m).to.have.ownProperty('text');
          assert.isAtLeast(m.text.length, 2);
          m.text.forEach(t => {
            if (typeof t === 'string') {
              assert.isAtMost(t.length, 40, t);
            }
            else {
              expect(t).to.be.an('Array', test.expected);
              expect(t[0]).to.be.a('string', m.id);
              expect(t[1]).to.be.a('Array', m.id);
              expect(t[1]).to.have.length.above(1, m.id);
            }
          });
        });
      });

      it(test.expected +  ' match has valid tag property', function() {
        info.getMatches(test.arg).forEach(m => {
          expect(m).to.have.ownProperty('tag');
          expect(m.tag).to.be.an('Array');
          assert.isAtLeast(m.tag.length, 1);
        });
      });

      it(test.expected +  ' match has valid emoji property', function() {
        info.getMatches(test.arg).forEach(m => {
          expect(m).to.have.ownProperty('emoji');
          expect(m.emoji).to.be.an('Array');
          assert.isAtLeast(m.emoji.length, 1);
        });
      });

      it(test.expected +  ' match has valid probability property', function() {
        let p = 0;
        info.getMatches(test.arg).forEach(m => {
          expect(m).to.have.ownProperty('probability');
          expect(m.probability).to.be.a('number');
          assert.isAtLeast(m.probability, 0.1);
          assert.isAtMost(m.probability, 1.0);
          p = Math.max(p, m.probability);
        });
        assert.equal(p, 1.0);
      });
    });
  });


  describe('get()', function() {
    tests.forEach(function(test) {
      it(test.expected + ' matches to single result', function() {
        const testRandomFunc = function() { return 0; };

        var result = info.get(test.arg, testRandomFunc);
        assert.isOk(result);
        assert.equal(result.id, test.expected);
      });
    });
  });


  describe('logicMatcher', function() {
    var m = info.matcher;
    it('evaluate single condition', function() {
      var e = m.is(m.specialDay(10, 3));
      assert.isTrue(e.evaluate(helper_SpecialDay(10, 3)));
      assert.isFalse(e.evaluate(helper_SpecialDay(9, 2)));
    });

    it('evaluate AND', function() {
      var e = m.is(m.specialDay(10, 3))
        .and(function(dt) { return true; })
        .and(function(dt) { return dt.getMonth() === 2; });
      assert.isTrue(e.evaluate(helper_SpecialDay(10, 3)));
      assert.isFalse(e.evaluate(helper_SpecialDay(10, 2)));
      assert.isFalse(e.evaluate(helper_SpecialDay(30, 3)));
    });

    it('evaluate OR', function() {
      var e = m.is(m.specialDay(10, 3)).or(m.specialDay(23, 2)).or(m.specialDay(16, 10));
      assert.isTrue(e.evaluate(helper_SpecialDay(10, 3)));
      assert.isTrue(e.evaluate(helper_SpecialDay(23, 2)));
      assert.isTrue(e.evaluate(helper_SpecialDay(16, 10)));
      assert.isFalse(e.evaluate(helper_SpecialDay(24, 12)));
    });

    it('evaluate AND / OR', function() {
      var e = m.is(m.weekEnd).and(m.timeOfDay(4, 10))
        .or(m.timeOfDay(15, 17)).and(m.dayOfWeek(0));
      assert.isTrue(e.evaluate(helper_TimeOfWeekDay(0, 7)));
      assert.isTrue(e.evaluate(helper_TimeOfWeekDay(0, 16)));
      assert.isFalse(e.evaluate(helper_TimeOfWeekDay(1, 16)));
    });
  });
});