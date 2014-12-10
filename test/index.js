
var fs = require('fs');
var sass = require('node-sass');

var cssScss = require('..');

var src = fs.readFileSync('./test/base2.css', 'utf8');

var result = cssScss(src);

//console.log('result:');
//console.log(result);

var rendered = sass.renderSync({ data: result });
console.log('Rendered with Node Sass');
//console.log(rendered);

fs.writeFileSync('./test/_base.scss', result);
fs.writeFileSync('./test/base-compiled.css', rendered);

