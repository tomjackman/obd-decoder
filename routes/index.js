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

/*
  Decodes the calculcated engine load data value.
  @param data {String} The PID data to decode.
*/
exports.decodeCalculatedEngineLoad = function(data)
{
  var a = exports.hexToDecimal(data);
  return ((100/255) * a);
}

/*
  Decodes the temperature data value for a number of PID's.
  @param data {String} The PID data to decode.
*/
exports.decodeTemperature = function(data)
{
  var a = exports.hexToDecimal(data);
  return (a - 40);
}

/*
  Decodes the short term fuel trim data value for a number of PID's.
  @param data {String} The PID data to decode.
*/
exports.decodeShortTermFuelTrim = function(data)
{
  var a = exports.hexToDecimal(data);
  return ((100/128)*a-100);
}

/*
  Decodes the fuel pressure data value.
  @param data {String} The PID data to decode.
*/
exports.decodeFuelPressure = function(data)
{
  var a = exports.hexToDecimal(data);
  return (3*a);
}

/*
  Decodes the intake manifold absolute pressure data value.
  @param data {String} The PID data to decode.
*/
exports.decodeIntakeManifoldAbsolutePressure = function(data)
{
  var a = exports.hexToDecimal(data);
  return a;
}

/*
  Decodes the engine rpm data value.
  @param data {String} The PID data to decode.
*/
exports.decodeEngineRPM = function(data)
{
  // TODO recover byte a and byte b from hex data
  var a = exports.hexToDecimal(data);
  var b = exports.hexToDecimal(data);
  return ((256*a)+b)/4;
}

/*
  Decodes the vehicle speed data value.
  @param data {String} The PID data to decode.
*/
exports.decodeVehicleSpeed = function(data)
{
  var a = exports.hexToDecimal(data);
  return a;
}

/*
  Decodes the timing advance data value.
  @param data {String} The PID data to decode.
*/
exports.decodeTimingAdvance = function(data)
{
  var a = exports.hexToDecimal(data);
  return ((a/2)-64);
}

/*
  Decodes the MAF air flow rate data value.
  @param data {String} The PID data to decode.
*/
exports.decodeMafAirFlowRate = function(data)
{
  // TODO recover byte a and byte b from hex data
  var a = exports.hexToDecimal(data);
  var b = exports.hexToDecimal(data);
  return ((256*a)+b)/100;
}

/*
  Decodes the throttle position data value.
  @param data {String} The PID data to decode.
*/
exports.decodeThrottlePosition = function(data)
{
  var a = exports.hexToDecimal(data);
  return ((100/255)*A);
}

/*
  Decodes the oxygen sensor voltage data value for a number of PID's.
  @param data {String} The PID data to decode.
*/
exports.decodeOxygenSensorVoltage = function(data)
{
  // TODO recover byte a from hex data
  var a = exports.hexToDecimal(data);
  return (a/200);
}
