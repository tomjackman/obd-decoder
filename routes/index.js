var express = require('express');
var PARAMETER_IDS = require('../config/parameterIDs.json');
var TROUBLE_CODES = require('../config/troubleCodes.json');

/*
  Converts a hexidecimal string to decimal.
  @param hexString {String} The hexidecimal string to convert to decimal.
*/
exports.hexToDecimal = function(hexString)
{
  hexString = exports.truncate(hexString);
  return parseInt(hexString, 16);
}

/*
  Truncates a ODB-II response.
  @param hexString {String} The hexidecimal string to truncate.
*/
exports.truncate = function(hexString)
{
  return hexString.replace(/\s/g, '');
}

/*
  Identifies the parameter id based on the response from the vehicle.
  @param hexString {String} The response string to try and identify.
*/
exports.getParameterID = function(hexString)
{
  hexString = exports.truncate(hexString);
  var mode = hexString.substring(1);
  var pid = exports.hexToDecimal(hexString.substring(2,3));

  if(mode === 1 || mode === 9){
    return "result" : {
      "status": "valid",
      "pid": PARAMETER_IDS[mode][pid].pid,
    	"bytes": PARAMETER_IDS[mode][pid].bytes,
    	"description": PARAMETER_IDS[mode][pid].description
    };
  }
  else{
    return "result" : {
      "status": "invalid"
    };
  }
}
