
var balanced = require('balanced-match');

module.exports = function(root) {

  var variables = [];
  var definitions = '';

  function replaceDefinition(declaration) {
    if (declaration.prop.match(/^\-\-/)) {
      declaration.prop = declaration.prop.replace(/^\-\-/, '$');
      variables.push({
        name: declaration.prop,
        value: declaration.value
      });
    }
  }

  function replaceValue(d) {
    var startIndex = d.value.indexOf('var(');
    var inner = balanced('(', ')', d.value.substring(startIndex));
    var replacement = '';
    if (inner.body.indexOf(',') !== -1) {
      var n = inner.body.indexOf(',');
      var fallback = ' /* Fallback value: ' + inner.body.split(',')[1] + ' */';
      replacement = inner.body.substring(0, n); 
    } else {
      replacement = inner.body;
    }
    replacement = replacement.replace(/^\-\-/, '');
    var newValue = d.value.replace('var(' + inner.body + ')', '$' + replacement);
    if (fallback) newValue += fallback;
    d.value = newValue;
    if (d.value.indexOf('var(') !== -1) {
      replaceValue(d);
    }
  }

  // Find variables as values
  root.eachRule(function(rule) {
    rule.eachDecl(function(d) {
      if (d.value.match(/var\(\-\-/g)) {
        replaceValue(d);
      }
    });
  });

  // Find variable definitions
  root.eachRule(function(rule) {
    if (rule.selector != ':root') return;
    rule.eachDecl(function(d) {
      replaceDefinition(d);
    });
    rule.removeSelf();
  });

  definitions = '\n// Converted Variables\n\n';
  variables.forEach(function(v) {
    definitions += v.name + ': ' + v.value + ' !default;\n';
  });

  return {
    root: root,
    definitions: definitions
  };

};

