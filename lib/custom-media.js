
module.exports = function (root) {

  var definitions = '// Custom Media Query Variables\n\n'

  var newRules = []

  root.walkAtRules(function (rule) {
    if (rule.name != 'custom-media') return
    var name = rule.params.split(' ')[0]
    var value = rule.params.replace(name + ' ', '')
    name = name.replace(/^\-\-/, '$')
    definitions += name + ': \'' + value + '\' !default;\n'
    rule.remove()
  })

  root.walkAtRules(function (rule) {
    if (rule.name != 'media') return
    if (rule.params.match(/^\(\-\-/)) {
      rule.params = rule.params.replace(/^\(\-\-/, '#{$')
      rule.params = rule.params.replace(/\)$/, '}')
    }
  })

  return {
    root: root,
    definitions: definitions
  }

}

