
var css = require('css');
// attempt to concat imports
//var rnpm = require('rework-npm');

var calc = require('./lib/calc');
var media = require('./lib/custom-media');
var variables = require('./lib/variables');

module.exports = function(src, options) {

  var options = options || {};

  var ast = css.parse(src);

  ast = calc(ast);

  var mediaObject = media(ast);
  ast = mediaObject.ast;
  var mediaDefinitions = mediaObject.definitions;

  var varObject = variables(ast);
  ast = varObject.ast;
  var definitions = varObject.definitions;

  //console.log(JSON.stringify(ast, null, 2));

  var scss = css.stringify(ast);

  scss = definitions + '\n' + mediaDefinitions + '\n' + scss;

  return scss;

};

