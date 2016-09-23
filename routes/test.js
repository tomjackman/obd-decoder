var decoder = require('./index');

var decNum = decoder.hexToDecimal("7fff");

console.log(decNum);

console.log(decoder.getLastDataByte("7ff7"));

console.log(decoder.getSecondLastDataByte("7ff7"));
