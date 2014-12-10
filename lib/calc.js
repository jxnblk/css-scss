
module.exports = function(ast) {

  ast.stylesheet.rules.forEach(function(rule, i) {
    if (!rule.declarations) return false;
    rule.declarations.forEach(function(d) {
      if (d.value.match(/calc\(/)) {
        d.value = d.value.replace(/calc\(/, '');
        // To do: find next ) instead of last
        d.value = d.value.replace(/\)/g, '');
      }
    });
  });

  return ast;

};

