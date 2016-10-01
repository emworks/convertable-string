module.exports = class ConvertableString {
  constructor() {
    return ((self) => Object.create({
      from: function(source) {
        if (!!~['undefined', 'boolean', 'function'].indexOf(typeof source))
          throw new Error('Source should be type string, number or object');
        if (!source.string)
          this[({
            'string': 'string',
            'number': 'position',
            'object': 'codes'
          })[typeof source]] = source;
        else
          this.position = source.position;
        return this.string;
      }
    }, {
      ALPHABET: {
        value: typeof arguments[0] === 'string' && Object.keys(arguments).length === 1
          ? arguments[0] : self.getAlphabet(arguments)
      },
      string: {
        get() {
          if (!(this._string = this._string || ''))
            if (this._position)
              this.string = self.stringAt.call(this, this._position);
            else if (this._codes && this._codes.length)
              this.string = self.stringBy.call(this, this._codes);
          return this._string;
        },
        set(value) {
          self.setProperties.call(this, { string: ''+value });
        }
      },
      position: {
        get() {
          if (!(this._position = this._position || 0))
            if (this._string)
              this.position = self.positionOf.call(this, this._string);
            else if (this._codes && this._codes.length)
              this.position = self.positionOf.call(this,
                self.stringBy.call(this, this._codes));
          return this._position;
        },
        set(value) {
          self.setProperties.call(this, { position: +value });
        }
      },
      codes: {
        get() {
          if (!(this._codes = this._codes || []).length)
            if (this._string)
              this.codes = self.codesIn.call(this, this._string);
            else if (this._position)
              this.codes = self.codesIn.call(this, self.stringAt.call(this,
                this._position));
          return this._codes;
        },
        set(value) {
          self.setProperties.call(this, { codes: [].concat(value) });
        }
      }
    }))(this);
  }

  setProperties(props) {
    Object.defineProperties(this, {
      _string: {
        value: props.string || '',
        writable: true,
        enumerable: false
      },
      _position: {
        value: props.position || 0,
        writable: true,
        enumerable: false
      },
      _codes: {
        value: props.codes || [],
        writable: true,
        enumerable: false
      }
    });
  }

  positionOf(string = '') {
    let exps = Array.from(Array(string.length), (x,i) => i).reverse();
    let code = 0, exp = 0;
    return string.split('').reduce((total, letter, i) => {
      code = this.ALPHABET.indexOf(letter) + 1;
      exp = Math.pow(this.ALPHABET.length, exps[i]);
      total += code * exp;
      return total;
    }, 0);
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
