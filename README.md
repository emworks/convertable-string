# Convertable String

Convert string from the one alphabet to another

## Basic example

```js
const ConvertableString = require('./convertable-string');

let ascii = new ConvertableString();
let en = new ConvertableString(97, 26);

let greeting = en.positionOf('hello');  // -> 3752127

console.log(ascii.stringAt(greeting));  // -> '#Bf&'
```

## More examples

`npm test`
