
module.exports = function(root) {

  var definitions = '// Custom Media Query Variables\n\n';

  var newRules = [];

  root.eachAtRule(function(rule) {
    if (rule.name != 'custom-media') return;
    var name = rule.params.split(' ')[0];
    var value = rule.params.replace(name + ' ', '');
    //value = value.replace(/(\(|\))/g, '');
    //var values = rule.params.split(/(\(|\))/g);
    name = name.replace(/^\-\-/, '$');
    definitions += name + ': \'' + value + '\';\n';
    rule.removeSelf();
  });

  root.eachAtRule(function(rule) {
    if (rule.name != 'media') return;
    if (rule.params.match(/^\(\-\-/)) {
      rule.params = rule.params.replace(/^\(\-\-/, '#{$');
      rule.params = rule.params.replace(/\)$/, '}');
    }
  });

  return {
    root: root,
    definitions: definitions
  };

};

