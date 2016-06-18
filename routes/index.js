var express = require('express');

/*
  Converts a hexidecimal string to decimal
  @param hexString {String} The hexidecimal string to convert to decimal.
*/
exports.hexToDecimal = function(hexString)
{
  return parseInt(hexString, 16);
}



};
