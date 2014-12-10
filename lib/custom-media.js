
module.exports = function(ast) {

  var definitions = '// Custom Media Query Variables\n\n';

  var newRules = [];

  ast.stylesheet.rules.map(function(rule) {
    if (rule.type == 'custom-media') {
      var string = rule.name.replace(/^\-\-/, '$') + ': ' + rule.media + ';\n';
      definitions += string;
    } else if (rule.type == 'media') {
      if (rule.media.match(/^\(\-\-/)) {
        rule.media = rule.media.replace(/^\(\-\-/, '($');
      }
      newRules.push(rule);
    } else {
      newRules.push(rule);
    }
  });

  ast.stylesheet.rules = newRules;

  return {
    ast: ast,
    definitions: definitions
  };

};

