# Typed Input
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/typed-input)
[![GitHub release](https://img.shields.io/github/release/Dabolus/typed-input/all.svg)](https://github.com/Dabolus/typed-input)
[![Build status](https://travis-ci.org/Dabolus/typed-input.svg?branch=master)](https://travis-ci.org/Dabolus/typed-input)
[![Minified + gzipped size](https://img.shields.io/bundlephobia/minzip/typed-input.svg)](https://bundlephobia.com/result?p=typed-input)

_[Demo and API docs](https://www.webcomponents.org/element/Dabolus/typed-input)_

An ultra simple element that extends the native input element and makes it typed.

## Installation
```bash
npm i typed-input
# or
yarn add typed-input
```

## Without npm/yarn
If you don't use npm or yarn, an IIFE (Immediately Invoked Function Expression) 
version of the element is also provided. The IIFE version of the element can 
also be used if you're still on Bower  (e.g. if you're using Polymer < 3). To 
use it, just use the `unpkg` CDN:

```html
<script src="https://unpkg.com/typed-input/typed-input.iife.min.js"></script>
```

## Usage
### Basic
After importing the ESM or the IIFE version of the element, just add 
`is="tryped-input"` to your `input` tag. From now on, your `input.value` will 
automagically be converted to the right type (numbers for `input[type="number"]`, 
dates for `input[type="date"]`, etc.). Remember that to get 
the typed value you will need to read the `value` property, **not** the `value` 
attribute. _e.g. `input.value` will work, `input.getAttribute('value')` won't._

If for some reason you need to access the original, stringified value, you can 
use the backup property `input.rawValue`.

Practical example:

```html
<script type="module" src="path/to/typed-input.js"></script>
<input is="typed-input" type="number" id="input">
<script>
  console.log(typeof input.value === 'number');
  // true
  console.log(typeof input.rawValue === 'string');
  // true
</script>
```

### Extending the element
If you're building your own input element and you want it to be typed, you can 
extend `HTMLTypedInputElement` instead of `HTMLInputElement`.

Practical example:

```javascript
import { HTMLTypedInputElement } from 'typed-input';

class MyCustomTypedInput extends HTMLTypedInputElement {
  // ...
}

customElements.define('my-custom-typed-input', MyCustomTypedInput, { extends: 'input' });
```

### Using the mixin
If you are extending an element that already extends the native input, 
or you need to add types to an input-like element (i.e. an element that has 
`type`, `value` and `checked` properties), a `typed` mixin is also provided.

Practical example:

```javascript
import { typed } from 'typed-input';

class MyCustomTypedInput extends typed(MyInputLikeElement) {
  // ...
}

customElements.define('my-custom-typed-input', MyCustomTypedInput, { extends: 'input' });
```
