
var balanced = require('balanced-match')

module.exports = function (root) {

  var RE_CALC = /calc/

  root.walkRules(function (rule, i) {
    rule.walkDecls(function (d) {
      if (d.value.match(/calc\(/)) {
        var startIndex = d.value.match(RE_CALC).index
        var inner = balanced('(', ')', d.value.substring(startIndex)).body
        d.value = d.value.replace('calc(' + inner + ')', '(' + inner + ')')
      }
    })
  })

  return root

}

