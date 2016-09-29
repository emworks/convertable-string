ConvertableString = require '../convertable-string'
assert = require 'assert'

describe 'ConvertableString', () ->

  ascii = new ConvertableString()
  en = new ConvertableString(97, 26)

  en.string = 'hello'
  greeting = en.position

  context 'Initialize', () ->

    describe 'ascii = new ConvertableString()', () ->
      it "should initialize with printable ascii chars by default", (done) ->
        asciiPrintableChars = ' !"#$%&\'()*+,-./0123456789:;<=>?@' +
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
        assert.equal ascii.ALPHABET, asciiPrintableChars
        done()

    describe 'en = new ConvertableString(start, length)', () ->
      it "should initialize with [length] chars from [start]", (done) ->
        enLowerLetters = 'abcdefghijklmnopqrstuvwxyz'
        assert.equal en.ALPHABET, enLowerLetters
        done()

  context 'Properties', () ->

    describe 'ascii.position of ascii.string: string', () ->
      it "should return position of the [ascii.string]", (done) ->
        ascii.string = '#';
        assert.equal ascii.position, 4
        done()

    describe 'ascii.codes in ascii.string: string', () ->
      it "should return char codes of the [ascii.string] letters", (done) ->
        ascii.string = 'hello';
        assert.deepEqual ascii.codes, [ 73, 70, 77, 77, 80 ]
        done()

    describe 'ascii.string at ascii.position: integer', () ->
      it "should return string at the [ascii.position]", (done) ->
        ascii.position = 7;
        assert.equal ascii.string, '&'
        done()

    describe 'ascii.string by ascii.codes: array', () ->
      it "should return string by [ascii.codes]", (done) ->
        ascii.codes = [ 73, 74 ];
        assert.equal ascii.string, 'hi'
        done()

    describe 'ascii.from(\'hello\')', () ->
      it "should set ascii.string = \'hello\'", (done) ->
        ascii.from('hello')
        assert.equal ascii.string, 'hello'
        done()

  context 'Conversion', () ->

    describe 'ascii.string by en.position', () ->
      it "should convert the word from en to ascii by en.position", (done) ->
        en.string = 'hello'
        ascii.position = en.position
        assert.equal ascii.string, '#Bf&'
        done()

    describe 'en.from(ascii.position)', () ->
      it "should set en.string by ascii.position", (done) ->
        ascii.string = '#Bf&'
        en.from(ascii.position)
        assert.equal en.string, 'hello'
        done()

    describe 'ascii.from(en)', () ->
      it "should convert the word from en to ascii", (done) ->
        en.string = 'hello'
        ascii.from(en)
        assert.equal ascii.string, '#Bf&'
        done()
