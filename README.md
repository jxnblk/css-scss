# CSS-SCSS
Convert CSS syntax to SCSS with calc, variables, and custom media queries

As used in http://basscss.com

## Install

```sh
npm install css-scss
```

## Usage

```js
var fs = require('fs');
var cssscss = require('css-scss');

var src = fs.readFileSync('./input.css', 'utf8');
var scss = cssscss(src);

fs.writeFileSync('./output.scss', scss);
```

## Results

### Variable Definitions

Convert this CSS:

```css
:root {
  --red: #f00;
}
```

Into this:

```scss
$red: #f00 !default;
```

### Variables in Declarations

Convert this:

```css
.warning {
  color: var(--red):
}
```

Into this:

```scss
.warning {
  color: $red;
}
```

### Custom Media Queries

Convert this:

```css
@media (--breakpoint-small) {
  .sm-col-6 { width: 50% }
}

@custom-media --breakpoint-small (min-width: 40em);
```

Into this:

```scss
$breakpoint-small: '(min-width: 40em)' !default;

@media #{$breakpoint-small} {
  .sm-col-6 { width: 50% }
}
```

### Calc

Convert this:

```css
.col-4 { calc( 4 / 12 * 100% ) }
```

Into this:

```scss
.col-4 { ( 4 / 12 * 100% ) }
```

MIT License
