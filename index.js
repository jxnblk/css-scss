
var postcss = require('postcss')

var calc = require('./lib/calc')
var media = require('./lib/custom-media')
var variables = require('./lib/variables')

module.exports = function (src, options) {

  var options = options || {}
  var root = postcss.parse(src)
  var mediaVarsString = ''
  var varsString = ''

  root = calc(root)

  var obj = media(root)
  root = obj.root
  mediaVarsString = obj.definitions

  var obj = variables(root)
  root = obj.root
  varsString = obj.definitions

  var scss = postcss().process(root).css

  scss = varsString + '\n' + mediaVarsString + '\n' + scss

  return scss

}

