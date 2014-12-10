
var cssScss = require('..');
var fs = require('fs');

var src = fs.readFileSync('./test/base.css', 'utf8');

var result = cssScss(src);

console.log(result);

