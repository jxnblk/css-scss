
var cssScss = require('..');
var fs = require('fs');
var sass = require('node-sass');

var src = fs.readFileSync('./test/base.css', 'utf8');

var result = cssScss(src);

console.log('result:');
console.log(result);

var rendered = sass.renderSync({ data: result });
console.log('Rendered with Node Sass');
console.log(rendered);

fs.writeFileSync('./test/result.css', rendered);

