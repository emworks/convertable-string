ConvertableString = require '../convertable-string'
assert = require 'assert'

describe 'ConvertableString', () ->

  ascii = new ConvertableString()
  en = new ConvertableString(97, 26)

  greeting = en.positionOf 'hello'

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

  context 'Methods', () ->

    describe 'ascii.positionOf(string: string)', () ->
      it "should return position of the [string]", (done) ->
        assert.equal ascii.positionOf('#'), 4
        done()

    describe 'ascii.codesIn(string: string)', () ->
      it "should return char codes of the [string] letters", (done) ->
        assert.deepEqual ascii.codesIn('hello'), [ 73, 70, 77, 77, 80 ]
        done()

    describe 'ascii.stringAt(position: integer)', () ->
      it "should return string at the [position]", (done) ->
        assert.equal ascii.stringAt(7), '&'
        done()

    describe 'ascii.stringBy(codes: array)', () ->
      it "should return string by [char codes]", (done) ->
        assert.equal ascii.stringBy([ 73, 74 ]), 'hi'
        done()

  context 'Conversion', () ->

    describe 'greeting = en.positionOf(\'hello\')', () ->
      it "should set english lowercased alphabet position of the word \'hello\'", (done) ->
        assert.equal en.positionOf('hello'), 3752127
        done()

    describe 'ascii.stringAt(greeting)', () ->
      it "should convert the word \'hello\' from en to ascii by position", (done) ->
        assert.equal ascii.stringAt(greeting), '#Bf&'
        done()

    describe 'en.stringAt(ascii.positionOf(\'hello\'))', () ->
      it "should convert the word \'hello\' from ascii to en", (done) ->
        assert.equal en.stringAt(ascii.positionOf('hello')), 'sknfwxw'
        done()
