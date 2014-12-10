
module.exports = function(root) {

  root.eachRule(function(rule, i) {
    rule.eachDecl(function(d) {
      if (d.value.match(/calc\(/)) {
        d.value = d.value.replace(/calc\(/, '');
        // To do: find next ) instead of last
        d.value = d.value.replace(/\)$/, '');
      }
    });
  });

  return root;

};

