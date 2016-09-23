var decoder = require('./index');
var assert = require('assert');

var SAMPLE_HEX_STRING_ONE = "7FF7";
var SAMPLE_HEX_STRING_TWO = "1AF4";
var SAMPLE_SPACED_HEX_STRING = "41 03 1A F4";

describe('Test getLastByte function', function() {
  it('should get the last byte of the data', function() {
    assert.equal("F7", decoder.getLastDataByte(SAMPLE_HEX_STRING_ONE));
  });
  it('the data returned should be 1 byte in size', function() {
    assert.equal(2, decoder.getSecondLastDataByte(SAMPLE_HEX_STRING_TWO).length);
  });
});

describe('Test getSecondLastByte function', function() {
  it('should get the last byte of the data', function() {
    assert.equal("1A", decoder.getSecondLastDataByte(SAMPLE_HEX_STRING_TWO));
  });
  it('the data returned should be 1 byte in size', function() {
    assert.equal(2, decoder.getSecondLastDataByte(SAMPLE_HEX_STRING_TWO).length);
  });
});

describe('Test truncate function', function() {
  it('should truncate the data', function() {
    assert.equal(-1, decoder.truncate(SAMPLE_SPACED_HEX_STRING).indexOf(" "));
  });
});

describe('Test hexToDecimal function', function() {
  it('should convert the data from hex to decimal', function() {
    assert.equal(32759, decoder.hexToDecimal(SAMPLE_HEX_STRING_ONE));
  });
  it('should convert the data from hex to decimal', function() {
    assert.equal(6900, decoder.hexToDecimal(SAMPLE_HEX_STRING_TWO));
  });
  it('should convert the spaced-out data from hex to decimal', function() {
    assert.equal(1090722548, decoder.hexToDecimal(SAMPLE_SPACED_HEX_STRING));
  });
});
