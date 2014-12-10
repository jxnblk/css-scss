
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

  function replaceValue(declaration) {
    var newValue = declaration.value.replace(/var\(\-\-/g, '$');
    // To do: find the next parenthesis instead of all
    newValue = newValue.replace(/\)/, '');
    if (newValue.indexOf(',') > 0) {
      var index = newValue.indexOf(',');
      newValue = newValue.slice(0, index);
    }
    declaration.value = newValue;
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
    definitions += v.name + ': ' + v.value + ';\n';
  });

  return {
    root: root,
    definitions: definitions
  };

};

