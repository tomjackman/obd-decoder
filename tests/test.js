var decoder = require('../routes/index');
var assert = require('assert');

var SAMPLE_HEX_STRING_ONE = "7FF7";
var SAMPLE_HEX_STRING_TWO = "1AF4";
var SAMPLE_HEX_BYTE_ONE = "3B"; // 59
var SAMPLE_HEX_BYTE_TWO = "A1"; // 161
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

describe('Test decodeCalculatedEngineLoad function', function() {
  it('should decode the correct engine load value', function() {
    assert.equal(23.14, decoder.decodeCalculatedEngineLoad(SAMPLE_HEX_BYTE_ONE));
  });
  it('should decode the correct engine load value', function() {
    assert.equal(63.14, decoder.decodeCalculatedEngineLoad(SAMPLE_HEX_BYTE_TWO));
  });
});

describe('Test decodeTemperature function', function() {
  it('should decode the correct temperature value', function() {
    assert.equal(19.00, decoder.decodeTemperature(SAMPLE_HEX_BYTE_ONE));
  });
  it('should decode the correct temperature value', function() {
    assert.equal(121.00, decoder.decodeTemperature(SAMPLE_HEX_BYTE_TWO));
  });
});

describe('Test decodeShortTermFuelTrim function', function() {
  it('should decode the correct short term fuel trim value', function() {
    assert.equal(-53.91, decoder.decodeShortTermFuelTrim(SAMPLE_HEX_BYTE_ONE));
  });
  it('should decode the correct short term fuel trim value', function() {
    assert.equal(25.78, decoder.decodeShortTermFuelTrim(SAMPLE_HEX_BYTE_TWO));
  });
});

describe('Test decodeFuelPressure function', function() {
  it('should decode the correct fuel pressure value', function() {
    assert.equal(177.00, decoder.decodeFuelPressure(SAMPLE_HEX_BYTE_ONE));
  });
  it('should decode the correct fuel pressure value', function() {
    assert.equal(483.00, decoder.decodeFuelPressure(SAMPLE_HEX_BYTE_TWO));
  });
});
