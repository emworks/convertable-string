const ConvertableString = require('./convertable-string');

let ascii = new ConvertableString();
let en = new ConvertableString(97, 26);

en.string = 'hello';

console.log(ascii.from(en));  // -> '#Bf&'
