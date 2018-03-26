'use strict';

// emoji:
// https://www.emojione.com/emoji/v2
// https://emoji.codes/
// https://www.emojicopy.com/

const Day = {
  Mon : 1,
  Tue : 2,
  Wed : 3,
  Thur : 4,
  Fr : 5,
  Sa : 6,
  So : 0
} 

const Probability = {
  impossible : 0,
  veryUnlikely : 0.15,
  unlikely : 0.25,
  possible : 0.5,
  likely : 0.75,
  veryLikely : 0.85,
  certain : 1.0
} 

function matchFactor(f) {
  return {
    _f : [ f ],
    evaluate : function(dt) {
      for (var i = 0; i < this._f.length; i++) {
        if (!this._f[i](dt)) {
          return false;
        }
      }
      return true;
    },
  }
}

function matchTerm(f) {
  return {
    _f : [ matchFactor(f) ],
    evaluate : function(dt) {
      for (var i = 0; i < this._f.length; i++) {
        if (this._f[i].evaluate(dt)) {
          return true;
        }
      }
      return false;
    },
    or : function(f) {
      this._f.push(matchFactor(f));
      return this;
    },
    and : function(f) {
      this._f[this._f.length - 1]._f.push(f);
      return this;
    }
  }
}

function is(f) {
  if (!f) {
    throw new Error("f must be defined");
  }
  return matchTerm(f);
}



function timeOfDay(hourFrom, hourTo) {
  return function(dt) {
    return dt.getHours() >= hourFrom && dt.getHours() < hourTo; 
  }
}

function specialDay(day, month, verySpecial) {
  return function(dt) {
    const untilHour = verySpecial ? 24 : 20;
    return day === dt.getDate() && (month - 1) === dt.getMonth() && timeOfDay(6, untilHour)(dt)
  }
}

function dayOfWeek(day) {
  return function(dt) {
    return dt.getDay() === day;
  }    
}

function timeOfWeekDay(day, hourFrom, hourTo) {
  return function(dt) {
    return dayOfWeek(day)(dt) && timeOfDay(hourFrom, hourTo)(dt);
  }
}

function weekEnd(dt) {
  return dayOfWeek(Day.Sa)(dt) || dayOfWeek(Day.So)(dt);
}

function weekDay(dt) {
  return !weekEnd(dt);
}


function birthday(who, day, month) {
  return {
    id : who,
    match : is(specialDay(day, month, true)),
    probability : Probability.possible,
    text : [
      'Hey ' + who + ", it's your birthday!",
      'Alles Gute zum Geburtstag ' + who + '!', 
      'Happy Birthday ' + who + '!'
    ],
    tag : [ 'birthday' ],
    emoji : [ 
      'birthday', 'cake', 'gift', 'ribbon', 'shopping_bags', 
      'balloon', 'tada', 'confetti_ball', 'champagne'
    ]
  };
};

function easterWeekend() {
  return function(dt) {
    const year = dt.getFullYear();
    const g = year % 19;
    const c = Math.floor(year / 100);
    const h = (c - Math.floor(c / 4) - Math.floor((8 * c + 13) / 25) + 19 * g + 15) % 30;
    const i = h - Math.floor(h / 28) * (1 - Math.floor(h / 28) * Math.floor(29 / (h + 1)) * Math.floor((21 - g) / 11));

    let day = i - ((year + Math.floor(year / 4) + i + 2 - c + Math.floor(c / 4)) % 7) + 28;
    let month = 3;
    if (day > 31) {
        month++;
        day -= 31;
    }
    let dt2 = new Date(2018, month - 1, day);
    dt2.setDate(day + 1);
    return dt.getDate() === day && (dt.getMonth() + 1) === month ||  // sunday
      dt.getDate() === dt2.getDate() && dt.getMonth() + dt2.getMonth(); // monday
  }}


var candidates = [
  {
    id : 'CatDay',
    match : is(specialDay(8, 8, false)),
    probability : Probability.unlikely,
    text : [
      "It's International Cat Day!",
      'Miau! Miau! Miau!',
      'Meow! Meow! Meow!',
      'Heute ist internationaler Katzentag!'
    ],
    tag : [ 'cat' ],
    emoji : [ 'cat', 'cat2', 'smiley_cat', 'kissing_cat', 'smile_cat', 'heart_eyes_cat' ]
  },
  {
    id : 'Valentine',
    match : is(specialDay(14, 2, false)),
    probability : Probability.possible,
    text : [
      "Happy Valentine's Day!",
      "Alles Liebe zum Valentinstag!",
      "Be my Valentine"
    ],
    tag : [ 'valentine' ],
    emoji : [ 
      'love_letter', 'sparkling_heart', 'cupid', 'love_hotel', 'tulip',
      'rose', 'bouquet', 'couplekiss', 'couple_with_heart' ]
  },
  {
    id : 'PiDay',
    match : is(specialDay(14, 3, false)),
    probability : Probability.possible,
    text : [
      "It's Pi Day!",
      "Happy Pi Day!",
      "3.14159265359"
    ],
    tag : [ 'pi', 'nerd' ],
    emoji : [ 'pencil', '1234', 'cake', 'nerd' ]
  },
  {
    id : 'PaddysDay',
    match : is(specialDay(17, 3, false)),
    probability : Probability.possible,
    text : [
      "It's St. Patrick's Day!",
      "Sláinte! It's Paddy's Day!",
      "Happy St. Patrick's Day!"
    ],
    tag : [ 'stpatricksday', 'guinness' ],
    emoji : [ 'beers', 'shamrock', 'beer', 'flag_ie' ]
  },
  {
    id : 'XMAS',
    match : is(specialDay(24, 12, true)),
    probability : Probability.possible,
    text : [
      'Merry Christmas!',
      'Frohe Weihnachten!',
      "It's Christmas!",
      'Merry Xmas!' 
    ],
    tag : [ 'xmas', 'santa' ],
    emoji : [ 'santa_tone1', 'christmas_tree', 'snowman2', 'gift']
  },
  {
    id : 'Easter',
    match : is(easterWeekend()),
    probability : Probability.possible,
    text : [
      'Frohe Ostern!',
      'Happy Easter!',
    ],
    tag : [ 'easter', 'easteregg', 'easterbunny' ],
    emoji : [ 'egg', 'rabbit' ]
  },
  {
    id : 'Giraffe',
    match : is(specialDay(21, 6, false)),
    probability : Probability.possible,
    text : [
      'Weltgiraffentag!',
      'Tag der Giraffe!',
      'World Giraffe Day!'
    ],
    tag : [ 'giraffe' ],
    emoji : [ 'dromedary_camel' ] // ;-)
  },
  {
    id : 'StarWars',
    match : is(specialDay(4, 5, false)), 
    probability : Probability.possible,
    text : [
      "It's Star Wars day!",
      'Happy Star Wars day!',
      'May the Force be with you!'
    ],
    tag : [ 'star+wars', 'jedi', 'yoda'],
    emoji : [ 'eight_pointed_black_star', 'dizzy', 'robot', 'alien' ]
  },
  {
    id : 'TowelDay',
    match : is(specialDay(25, 5, false)),
    probability : Probability.possible,
    text : [
      "It's Towel Day!",
      "Don't Panic!",
      '42!',
      "Don't forget your towel today.",
      'Did you pack your towel today?'
    ],
    tag : [ 'galaxy', 'universe' ],
    emoji : [ 'eight_pointed_black_star', 'dizzy', 'telescope', 'sparkles', 'alien' ]
  },
  {
    id : 'GroundhogDay',
    match : is(specialDay(2, 2, false)),
    probability : Probability.possible,
    text : [
      "Murmeltiertag!",
      "Früher Frühling ...?",
      "... oder noch 6 Wochen Winter?",
      'Sieht Phil seinen Schatten?'
    ],
    tag : [ 'groundhogday', 'groundhog', 'winter' ],
    emoji : [ 'snowman', 'snowman2', 'snowflake', 'chipmunk', 'rainbow', 'partly_sunny' ]
  },
  {
    id : 'Halloween',
    match : is(specialDay(31, 10, true)),
    probability : Probability.possible,
    text: [
      'Halloween!',
      'Happy Halloween!',
      ['Heute ist Weltspartag', [ 'moneybag', 'dollar', 'euro', 'money_with_wings', 'money_mouth']],
      ['Alles Gute zum Namenstag!', [ 'blush', 'kissing_closed_eyes', 'wink' ]],
      ['Trick or Treat!', [ 'chocolate_bar', 'lollipop', 'candy' ]],
      ['Süßes oder Saures!', [ 'chocolate_bar', 'lollipop', 'candy' ]]
    ],
    tag : [ 'halloween' ],
    emoji : [ 'jack_o_lantern', 'spider', 'ghost', 'skull', 'spider', 'spider_web']
  },
  {
    id : 'Nikolaus',
    match : is(specialDay(6, 12, true)), 
    probability : Probability.possible,
    text : [
      "Nikolausabend!",
      "Nikolaus!",
      "Nikolaustag!",
      "Waren alle brav?"
    ],
    tag : [ 'santa+claus', 'christmas-season' ],
    emoji : [ 'tangerine', 'santa_tone1', 'snowflake', 'peanuts' ]
  },
  {
    id : 'Sylvester',
    match : is(specialDay(31, 12, true)),
    probability : Probability.possible,
    text : [
      'Guten Rutsch!',
      'Prosit ' + (new Date().getFullYear() + 1),
    ],
    tag : [ 'fireworks', 'sylvester' ],
    emoji : [
      'sparkler', 'fireworks', 'champagne', 'champagne_glass', 'pig_nose', 
      'pig', 'tophat', 'four_leaf_clover'
    ]
  },
  {
    id : 'NewYear',
    match : is(specialDay(1, 1, true)), 
    probability : Probability.possible,
    text : [
      "Prosit Neujahr!",
      "Ein gutes neues Jahr!",
      "Frohes neues Jahr!"
    ],
    tag : [ 'clover', 'newyear' ],
    emoji : [ 'pig_nose', 'four_leaf_clover', 'tophat', 'thumbsup', 'pig' ]
  },
  {
    id : 'WeddingDay',
    match : is(specialDay(3, 9, true)),
    probability : Probability.possible,
    text : [
      'Gratulation zum  Hochzeitstag!',
      'Frohen Hochzeitstag!',
      'Schönen Hochzeitstag!'
    ],
    tag : [ 'wedding', 'bride' ],
    emoji : [ 
      'church', 'bouquet', 'rose', 'tophat', 'wedding',
      'champagne_glass', 'man_in_tuxedo', 'ring', 'bride_with_veil'
    ]
  },
  {
    id : 'ProgrammersDay',
    match : is(function(dt) {
      var timestmp = new Date().setFullYear(dt.getFullYear(), 0, 1);
      var yearFirstDay = Math.floor(timestmp / 86400000);
      var today = Math.ceil(dt.getTime() / 86400000);
      var dayOfYear = today - yearFirstDay;
      return dayOfYear === 256;
    }),
    probability : Probability.veryLikely,
    text : [
      'Day of the Programmer!',
      "Programmer's Day!",
      'Tag des Programmierers!'
    ],
    tag : [ 'programming', 'programmer', 'nerd', 'geek' ],
    emoji : [ 
      'nerd', 'computer', 'keyboard', 'desktop', 'floppy_disk', 'mouse_three_button'
    ]
  },

  birthday('Steffi', 23, 2),
  birthday('Timo', 16, 10),
  birthday('Nico', 2, 12),
  birthday('Wolfgang', 10, 3),
  
  {
    id : 'Workout',
    match : is(timeOfWeekDay(Day.Mon, 6, 7)).
      or(timeOfWeekDay(Day.Wed, 6, 7)).
      or(timeOfWeekDay(Day.Fr, 6, 7)),
    probability : Probability.veryLikely,
    text : [ 
      "Go get 'em!",
      ['Good morning champion!', [ 'star', 'trophy', 'first_place', 'first_place' ]],
      'Ready for a good workout?',
      'Ready for your workout?'
    ],
    tag : ['workout', 'weightlifting', 'muscle', 'motivational'],
    emoji : ['thumbsup_tone1', 'lifter', 'muscle']
  },
  {
    id : 'PocketMoney',
    match : is(timeOfWeekDay(1, 7, 18)),
    probability : Probability.possible,
    text : [
      "Taschengeld",
      "Heute gibt's Taschengeld",
    ],
    tag : [ 'money', 'cash' ],
    emoji : [ 'money_mouth', 'money_with_wings', 'dollar', 'euro', 'moneybag' ]
  },
  {
    id : 'BurritoFriday',
    match : is(timeOfWeekDay(5, 11, 17)),
    probability : Probability.likely,
    text : [
      "It's Burrito Friday!",
      "TGIF!",
      "TGI(Burrito)F!",
      "Burrito Freitag!",
      'Burrito, Burrito, Burrito'
    ],
    tag : [ 'burrito' ],
    emoji : [ 'taco', 'burrito', 'avocado', 'hot_pepper' ]
  },
  {
    id : 'XmasCalendar',
    match : is(function(dt) {
      return dt.getMonth() === 11 && dt.getDate() <= 24 && dt.getHours() >= 6 && dt.getHours() < 11;
    }),
    probability : Probability.likely,
    text : [ 
      'Was war im Adventkalender?',
      'Hast du das Türchen aufgemacht?'
    ],
    tag : [ 'christmas+calendar' ],
    emoji : [ 
      'candy', 'lollipop', 'date', 'police_car', 'oncoming_police_car', 'rotating_light'
    ]
  },
  {
    id : 'Breakfast',
    match : is(weekEnd).and(timeOfDay(7, 11)),
    probability : Probability.likely,
    text : [
      'Ausgeschlafen?',
      ['Frühstück für Champions!', [ 'trophy', 'grinning', 'thumbsup' ]],
      'Wochenendfrühstück!'
    ],
    tag : [ 'breakfast' ],
    emoji : [ 'pancakes', 'bacon', 'croissant', 'honey_pot', 'cooking', 'tea', 'coffee' ]
  },
  {
    id : 'Bundesliga',
    match : is(function(dt) {
      // TODO: isbetween datefrom dateto
      let m = dt.getMonth();
      let h = dt.getHours();
      return dt.getDay() === Day.Sa &&
        (m >= 7 && m <= 11 || m >= 1 && m <= 4) &&
        h >= 18 && h < 20;
    }),
    probability : Probability.veryLikely,
    text : [ 
      'Bundesliga!',
      'Sportschau!',
      'Fußball gucken!'
    ],
    tag : [ 'bundesliga', 'bvb09' ],
    emoji : [ 'soccer', 'goal', 'tv' ],
  },
  {
    id : 'Weekend',
    match : is(weekEnd).and(timeOfDay(10, 19)),
    probability : Probability.likely,
    text : [
      'Wochenende!',
      'Was steht am Programm?',
      "Los geht's! Wochenendausflug!"
    ],
    tag : [ 'weekend' ],
    emoji : [
      'tada', 'dancer_tone2', 'beers', 'cocktail',
      'tropical_drink', 'man_dancing_tone2'
    ]
  },
  {
    id : 'Advent',
    match : is(function(dt) {
      return dt.getMonth() === 11 && dt.getDate() < 24 && 
        dt.getHours() >= 17 && dt.getHours() < 20;
    }),
    probability : Probability.likely,
    text : [ 
      'Advent, Advent, ...',
      'Singen wir am Adventkranz'
    ],
    tag : [ 'candle' ],
    emoji : [ 
      'candle', 'dizzy'
    ]
  },

  {
    id : 'GoodMorning',
    match : is(timeOfDay(6, 11)),
    probability : Probability.certain,
    text : [ 
      'Have a great day!',
      'Guten Morgen!',
      'Rise and shine!',
      'Have an awesome day!',
      'Good morning handsome!'
    ],
    tag : [ 'good+morning', 'sunrise', 'wake+up', 'coffee' ],
    emoji : [ 
      'shower', 'coffee', 'tea', 'ok_hand', 'v', 'sunrise',
      'sunrise_over_mountains', 'smile_cat' 
    ]
  },
  {
    id : 'Lunch',
    match : is(timeOfDay(11, 14)),
    probability : Probability.certain,
    text : [
      'Mahlzeit!',
      'Enjoy your lunch!',
      "Was gibt's heute zum Mittagessen?",
      "What's for lunch today?"
    ],      
    tag : [ 'lunch' ],
    emoji : [
      'pizza', 'hamburger', 'fries', 'apple', 'sushi', 'cooking', 'poultry_leg',
      'watermelon', 'shallow_pan_of_food', 'stew', 'spaghetti', 'fork_knife_plate'
    ],
  },
  {
    id : 'Afternoon',
    match : is(timeOfDay(14, 18)), 
    probability : Probability.certain,
    text : [ 
      ['Müssen wir noch einkaufen?', [ 'shopping_cart', 'shopping_bags' ]],
      ['Ein Bild malen?', [ 'art', 'crayon' ]],
      ['Langeweile ...?', [ 'unamused', 'poop' ]],
      ['Einfach Musik hören?', [ 'cd', 'radio', 'musical_keyboard']],
      ['An apple a day ...', [ 'apple', 'pill' ]],
      ["Wie wär's mit einem Spiel?", [ 'game_die', 'black_joker' ]],
      ['Ein Buch lesen?', ['books', 'books', 'closed_book']],
      ['Vielleicht basteln?', [ 'scissors', 'paperclips', 'straight_ruler', 'triangular_ruler' ]],
      ['Ein Runde Fahrad fahren?', [ 'mountain_bicyclist', 'bicyclist' ]],
      ['Roller fahren?', [ 'scooter', 'checkered_flag' ]],
      ['Auf den Spielplatz?', ['basketball_player_tone1', 'soccer', 'basketball']]
    ],
    tag : [ 'playground', 'afternoon'],
    emoji : [ 'monkey' ],
  },
  {
    id : 'BedTime',
    match : is(timeOfDay(19, 20)), 
    probability : Probability.veryLikely,
    text : [
      'Schlafenszeit',
      'Schlaft gut, liebe Kinder',
      'Gute Nacht, Timo',
      'Nighty night',
      'Gute Nacht, Nico',
      'Zeit zum Bettgehen'
    ],
    tag : ['bed', 'sleepy' ],
    emoji : [ 'bed', 'sleeping_accommodation', 'sleeping', 'full_moon_with_face' ]
  },
  {
    id : 'Evening',
    match : is(timeOfDay(18, 24)), 
    probability : Probability.certain,
    text : [
      ['Wanna play a game?', [ 'joystick', 'video_game', 'space_invader' ]],
      ['Take a relaxing bath.', [ 'bathtub', 'bath_tone1' ]],
      'Enjoy your evening',
      ['Couchen und Fernschauen', [ 'tv', 'couch', 'clapper', 'film_frames' ]], 
      ['Ein Projekt wartet ...', ['keyboard', 'computer', 'bar_chart', 'wrench', 'mouse_three_button' ]],
      ['Watch some Netflix?', [ 'film_frames', 'tv', 'couch', 'clapper' ]],
      ['Netflix and chill?', [ 'smirk', 'tv', 'couch' ]]
    ],
    tag : ['tv', 'netflix', 'movie', 'sunset' ],
    emoji : [ 'wine_glass', 'tumbler_glass', 'bridge_at_night', 'night_with_stars']
  },
  {
    id : 'Night',
    match : is(timeOfDay(0, 6)),
    probability : Probability.certain,
    text : [
      'You really should be sleeping ...',
      'So spät noch auf ...?',
      'Immer noch munter ...?',
      'Kannst du morgen ausschlafen?',
      'No work tomorrow?'
    ],
    tag : [ 'sleeping' ],
    emoji : [
      'sleeping', 'thinking', 'bed', 'sleeping_accommodation',
      'bridge_at_night', 'zzz', 'full_moon_with_face']
  },
];

function getMatchesForTime(dt) {
  let matches = [];
  candidates.forEach(c => {
    if (c.match.evaluate(dt)) {
      matches.push(c);
    }
  });
  return matches;
}

function oneOf(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getSingleMatchForTime(dt, fRandom) {
  if (!dt) {
    dt = new Date();
  }
  if (!fRandom) {
    fRandom = Math.random;
  }

  const matches = getMatchesForTime(dt);
  //console.log(matches);
  const match = matches.find(m => fRandom() <= m.probability);

  let result = { id : match.id };
  const t = oneOf(match.text);
  if (typeof t === 'string') {
    result.text = t;
  }
  else {
    result.text = t[0];
    result.emoji = oneOf(t[1]);
  }
  result.tag = oneOf(match.tag);
  if (!result.emoji) {
    result.emoji = oneOf(match.emoji);
  }
  result.emoji = 'e1a-' + result.emoji;
  return result;
}


module.exports = {
  matcher : {  // Exported for unit test
    is : is,
    specialDay : specialDay,
    timeOfDay : timeOfDay,
    dayOfWeek : dayOfWeek,
    weekEnd : weekEnd
  },
  getMatches : getMatchesForTime,
  get : getSingleMatchForTime
};
