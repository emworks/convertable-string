'use strict';

const ConvertableString = require('./convertable-string');

/*
let ascii = new ConvertableString();
let en = new ConvertableString(97, 26);

en.string = 'hello';

console.log(ascii.from(en));  // -> '#Bf&'

ascii.string = 'hello';

console.log(ascii.string === en.string);  // true, 'hello' equals 'hello'
console.log(ascii.position === en.position);  // false, 6006614195 > 3752127
*/

module.exports = ConvertableString;
