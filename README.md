# Convertable String

Convert string from the one alphabet to another

## Basic example

```js
const ConvertableString = require('./convertable-string');

let ascii = new ConvertableString();
let en = new ConvertableString(97, 26);

en.string = 'hello';

console.log(ascii.from(en));  // -> '#Bf&'
```

## More examples

run `npm test`
