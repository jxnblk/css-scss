var assert = require('assert');
var fs = require('fs');
var sass = require('node-sass');
var cssScss = require('..');

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

  it('should handle variables assigned to other variables', function() {
    var inputCss = fixture('variables.css');
    var expectedCss = fixture('variables.expected.scss');

    var outputCss = cssScss(inputCss);
    fs.writeFileSync('./test/fixtures/variables.output.scss', outputCss);
    assert.equal(outputCss.trim(), expectedCss.trim());
  });

  it('should be valid scss', function() {
    var outputCss = cssScss(fixture('basscss-base.css'));
    assert.doesNotThrow(function() {
      sass.renderSync({ data:  outputCss });
    });
  });
});

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8').trim();
}
