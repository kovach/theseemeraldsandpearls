var _ = require('mori');

state = {
  words: _.list(),
}

var count = function(strs) {
  var count = 0;
  var i = 0;

  _.some(function(str) {
    i++;
    count += str.length;
    if (count >= 22)
      return true;
  }, strs);
  
  if (count === 22) {
    console.log('MATCH');
    return _.reverse(_.take(i, strs));
  }

  return false;
}
var appendWord = function(input_str) {
  var words = input_str.split(' ');
  console.log('heard: ', input_str);
  words.reverse();

  state.words = _.concat(words, state.words);
  var match = count(state.words);

  if (match) {
    var matches = _.into_array(match);
    console.log(matches);
    appendStringDom('"' + matches.join(' ') + '"');
  }
}

var appendStringDom = function(str) {
  var elem = document.createElement('div');
  elem.appendChild(document.createTextNode(str));
  document.getElementById('main').appendChild(elem);
}

var init_annyang = function() {
  console.log('annyang starting');
  var commands = {
    '*words': appendWord
  }
  annyang.addCommands(commands);
  annyang.start();
  console.log('annyang started');
}

module.exports = {
  count: count,
  init_annyang: init_annyang,
  appendStringDom: appendStringDom,
}
