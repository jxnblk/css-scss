import fs from 'fs'
import test from 'ava'
import sass from 'node-sass'
import cssScss from '../'


test('converta css to scss', t => {
  t.plan(1)

  var inputCss = fixture('basscss-base.css')
  var expectedCss = fixture('basscss-base.expected.scss')

  var outputCss = cssScss(inputCss).trim()
  fs.writeFileSync('test/fixtures/basscss-base.output.scss', outputCss)
  t.is(outputCss.trim(), expectedCss.trim())
})

test('should correctly handle custom media', t => {
  t.plan(1)

  var inputCss = fixture('custom-media.css')
  var expectedCss = fixture('custom-media.expected.scss')

  var outputCss = cssScss(inputCss)
  fs.writeFileSync('test/fixtures/custom-media.output.scss', outputCss)
  t.is(outputCss.trim(), expectedCss.trim())
})

test('should handle variables assigned to other variables', t => {
  t.plan(1)

  var inputCss = fixture('variables.css')
  var expectedCss = fixture('variables.expected.scss')

  var outputCss = cssScss(inputCss)
  fs.writeFileSync('test/fixtures/variables.output.scss', outputCss)
  t.is(outputCss.trim(), expectedCss.trim())
})

test('should be valid scss', t => {
  t.plan(1)

  var outputCss = cssScss(fixture('basscss-base.css'))
  t.notThrows(() => {
    sass.renderSync({ data:  outputCss })
  })
})

function fixture(name) {
  return fs.readFileSync('test/fixtures/' + name, 'utf8').trim()
}
