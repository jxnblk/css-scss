
var balanced = require('balanced-match')
var isCssRoot = require('is-css-root')

module.exports = function (root) {

  var variables = []
  var definitions = ''

  function replaceDefinition (declaration) {
    if (declaration.prop.match(/^\-\-/)) {
      declaration.prop = declaration.prop.replace(/^\-\-/, '$')
      var commentTest = /\s\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g
      var fallback = declaration.value.match(commentTest)
      var value = declaration.value.replace(commentTest, '')
      variables.push({
        name: declaration.prop,
        value: value,
        fallback: fallback || null
      })
    }
  }

  function replaceValue (d) {
    var startIndex = d.value.indexOf('var(')
    var inner = balanced('(', ')', d.value.substring(startIndex))
    var replacement = ''
    if (inner.body.indexOf(',') !== -1) {
      var n = inner.body.indexOf(',')
      var fallback = ' /* Fallback value: ' + inner.body.split(',')[1] + ' */'
      replacement = inner.body.substring(0, n)
    } else {
      replacement = inner.body
    }
    replacement = replacement.replace(/^\-\-/, '')
    var newValue = d.value.replace('var(' + inner.body + ')', '$' + replacement)
    if (fallback) newValue += fallback
    d.value = newValue
    if (d.value.indexOf('var(') !== -1) {
      replaceValue(d)
    }
  }

  // Find variables as values
  root.walkRules(function (rule) {
    rule.walkDecls(function (d) {
      if (d.value.match(/var\(\-\-/g)) {
        replaceValue(d)
      }
    })
  })

  // Find variable definitions
  root.walkRules(function (rule) {
    if (!isCssRoot(rule.selector)) return
    rule.walkDecls(function (d) {
      replaceDefinition(d)
    })
    rule.remove()
  })

  definitions = '\n// Converted Variables\n\n'
  variables.forEach(function (v) {
    definitions += v.name + ': ' + v.value + ' !default;'
    definitions += (v.fallback ? v.fallback : '') + '\n'
  })

  return {
    root: root,
    definitions: definitions
  }

}

