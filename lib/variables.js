
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

  /*
  function findDefinitions(rules) {
    // Only works for :root rulesets
    var newRules = [];
    rules.forEach(function(rule, i) {
      if (!rule.selectors) {
        newRules.push(rule);
        return false;
      }
      if (rule.selectors[0] == ':root') {
        if (!rule.declarations) return false;
        rule.declarations.forEach(function(d) {
          replaceDefinition(d);
        });
      }
      newRules.push(rule);
    });
    ast.stylesheet.rules = newRules;
  }

  function findValues(rules) {
    rules.forEach(function(rule, i) {
      if (!rule.declarations) return false;
      rule.declarations.forEach(function(d) {
        if (d.value.match(/var\(\-\-/g)) {
          replaceValue(d);
        }
      });
    });
  }
  */

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

  /*
  findValues(ast.stylesheet.rules);
  findDefinitions(ast.stylesheet.rules);
  */

  definitions = '\n// Converted Variables\n\n';
  variables.forEach(function(v) {
    definitions += v.name + ': ' + v.value + ';\n';
  });

  return {
    root: root,
    definitions: definitions
  };

};

