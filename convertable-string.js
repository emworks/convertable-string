module.exports = class ConvertableString {
  constructor() {
    this.ALPHABET = typeof arguments[0] === 'string' && Object.keys(arguments).length === 1
      ? arguments[0] : this.getAlphabet(arguments);
  }

  positionOf(string = '') {
    let codes = this.codesIn(string);
    let exps = Array.from(Array(string.length), (x,i) => i).reverse();
    return exps.reduce((total, exp, i) =>
      (total += codes[i] * Math.pow(this.ALPHABET.length, exp)) && total
    , 0);
  }

  codesIn(string = '') {
    return string.split('').reduce((codes, letter) =>
      codes.push(this.ALPHABET.indexOf(letter) + 1) && codes
    , []);
  }

  stringAt(position = 0) {
    let string = '';
    let search = (position = 0) => {
      if (position <= this.ALPHABET.length) {
        string += this.ALPHABET[position-1];
        return;
      }
      let min = 0, max = 0, step = 0, exp = 1, next = 0, tmp = 0;
      while ((max += tmp = Math.pow(this.ALPHABET.length, exp)) < position) {
        step = tmp;
        exp++;
      }
      min = max / this.ALPHABET.length;
      tmp = Math.floor((position - min) / step);
      next = position - step * (tmp + 1);
      string += this.ALPHABET[tmp];
      search(next);
    };
    search(position);
    return string;
  }

  stringBy(codes = []) {
    return codes.reduce((str, code) => (str += this.ALPHABET[code-1]) && str, '');
  }

  /**
   * Get current alphabet as string
   * For example:
   * pass 97, 26 to get a-z
   * 65, 26 returns A-Z
   * 48, 10 returns 0-9
   * by default (without params) it returns printable ascii characters
   * @return {String}
   */
  getAlphabet() {
    let [ start = 0, length = 0 ] = arguments[0];
    let excluded = Array(32).fill().map((n,i) => i).concat(127);
    return Array(length || 128).fill().map((n,i) => start+i).reduce((chars,i) =>
      !start && !length && !!~excluded.indexOf(i)
        ? chars : (chars += String.fromCharCode(i)) && chars
    , '');
  }
};
