var assert = require('assert');
var cssScss = require('..');
var fs = require('fs');

describe('css-scss', function() {

  it('should convert css to scss', function() {
    var inputCss = fixture('basscss-base.css');
    var expectedCss = fixture('basscss-base.expected.scss');

    var outputCss = cssScss(inputCss).trim();
    fs.writeFileSync('./test/fixtures/basscss-base.output.scss', outputCss);
    assert.equal(outputCss.trim(), expectedCss.trim());
  });

  it('should correctly handle custom media', function() {
    var inputCss = fixture('custom-media.css');
    var expectedCss = fixture('custom-media.expected.scss');

    var outputCss = cssScss(inputCss);
    fs.writeFileSync('./test/fixtures/custom-media.output.scss', outputCss);
    assert.equal(outputCss.trim(), expectedCss.trim());
  });
});

/*
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
*/

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8').trim();
}
