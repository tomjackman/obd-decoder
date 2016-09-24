var express = require('express');
var PARAMETER_IDS = require('../config/parameterIDs.json');
var TROUBLE_CODES = require('../config/troubleCodes.json');

/*
  Converts a hexidecimal string to decimal.
  @param hexString {String} The hexidecimal string to convert to decimal.
*/
function hexToDecimal(hexString) {
  hexString = truncate(hexString);
  return parseInt(hexString, 16);
}

/*
  Truncates a ODB-II response.
  @param hexString {String} The hexidecimal string to truncate.
*/
function truncate(hexString) {
  return hexString.replace(/\s/g, '');
}

/*
  Identifies the parameter id based on the response from the vehicle in format 41 04 3C or 41043C.
  @param hexString {String} The response string to try and identify.
*/
function getParameterID(hexString) {
  var responseFlag = hexString.substring(0,1);
  hexString = truncate(hexString);
  var mode = hexString.substring(1,2);
  var pid = hexToDecimal(hexString.substring(3,4));

  if ((mode === "1" || mode === "9") && responseFlag === "4") {
    return {"result" : {
      "valid": true,
      "pid": PARAMETER_IDS[mode][pid].pid,
      "bytes": PARAMETER_IDS[mode][pid].bytes,
      "description": PARAMETER_IDS[mode][pid].description
    }
  };
  } else {
    return { "result" : {
      "valid": false
    }
  };
  }
}

/*
  Returns a number to two decimal Places.
  @param value {int} a number.
*/
function toTwoDecimalPlaces(value) {
  return Number(value).toFixed(2);
}

/*
  Gets the last byte from a vehicle reponse hex string.
  @param data {String} The hex data.
*/
function getLastDataByte(data) {
  return data.substring(data.length - 2);
}

/*
  Gets the second last byte from a vehicle reponse hex string.
  @param data {String} The hex data.
*/
function getSecondLastDataByte(data) {
  return data.substring(data.length-4, data.length-2);
}

/*
  Decodes the calculcated engine load data value.
  @param data {String} The PID data to decode.
*/
function decodeCalculatedEngineLoad(data) {
  var a = hexToDecimal(data);
  return toTwoDecimalPlaces((100/255) * a);
}

/*
  Decodes the temperature data value for a number of PID's.
  @param data {String} The PID data to decode.
*/
function decodeTemperature(data) {
  var a = hexToDecimal(data);
  return toTwoDecimalPlaces(toTwoDecimalPlaces(a - 40));
}

/*
  Decodes the short term fuel trim data value for a number of PID's.
  @param data {String} The PID data to decode.
*/
function decodeShortTermFuelTrim(data) {
  var a = hexToDecimal(data);
  return toTwoDecimalPlaces((100/128)*a-100);
}

/*
  Decodes the fuel pressure data value.
  @param data {String} The PID data to decode.
*/
function decodeFuelPressure(data) {
  var a = hexToDecimal(data);
  return toTwoDecimalPlaces(3*a);
}

/*
  Decodes the intake manifold absolute pressure data value.
  @param data {String} The PID data to decode.
*/
function decodeIntakeManifoldAbsolutePressure(data) {
  var a = hexToDecimal(data);
  return toTwoDecimalPlaces(a);
}

/*
  Decodes the engine rpm data value.
  @param data {String} The PID data to decode.
*/
function decodeEngineRPM(data) {
  var a = getSecondLastDataByte(hexToDecimal(data));
  var b = getLastDataByte(hexToDecimal(data));
  return toTwoDecimalPlaces(((256*a)+b)/4);
}

/*
  Decodes the vehicle speed data value.
  @param data {String} The PID data to decode.
*/
function decodeVehicleSpeed(data) {
  var a = hexToDecimal(data);
  return toTwoDecimalPlaces(a);
}

/*
  Decodes the timing advance data value.
  @param data {String} The PID data to decode.
*/
function decodeTimingAdvance(data) {
  var a = hexToDecimal(data);
  return toTwoDecimalPlaces((a/2)-64);
}

/*
  Decodes the MAF air flow rate data value.
  @param data {String} The PID data to decode.
*/
function decodeMafAirFlowRate(data) {
  var a = getSecondLastDataByte(hexToDecimal(data));
  var b = getLastDataByte(hexToDecimal(data));
  return toTwoDecimalPlaces(((256*a)+b)/100);
}

/*
  Decodes the throttle position data value.
  @param data {String} The PID data to decode.
*/
function decodeThrottlePosition(data) {
  var a = hexToDecimal(data);
  return toTwoDecimalPlaces((100/255)*a);
}

/*
  Decodes the oxygen sensor voltage data value for a number of PID's.
  @param data {String} The PID data to decode.
*/
function decodeOxygenSensorVoltage(data) {
  var a = getSecondLastDataByte(hexToDecimal(data));
  return toTwoDecimalPlaces(a/200);
}


/*
  Decodes the oxygen sensor voltage data value for a number of PID's.
  @param data {String} The PID data to decode.
*/
function decodeOxygenSensorShortTermFuelTrim(data) {
  var b = getLastDataByte(hexToDecimal(data));
  return toTwoDecimalPlaces(((100/128)*b)-100);
}

/*
  Decodes the run time since engine start data value.
  @param data {String} The PID data to decode.
*/
function decodeRunTimeSinceEngineStart(data) {
  var a = getSecondLastDataByte(hexToDecimal(data));
  var b = getLastDataByte(hexToDecimal(data));
  return toTwoDecimalPlaces((256*a)+b);
}

/*
  Decodes the distance traveled with malfunction indicator lamp (MIL) on data value.
  @param data {String} The PID data to decode.
*/
function decodeDistanceTravelledMilOn(data) {
  var a = getSecondLastDataByte(hexToDecimal(data));
  var b = getLastDataByte(hexToDecimal(data));
  return toTwoDecimalPlaces((256*a)+b);
}

/*
  Decodes the distance traveled with malfunction indicator lamp (MIL) on data value.
  @param data {String} The PID data to decode.
*/
function decodeFuelRailPressure(data) {
  var a = getSecondLastDataByte(hexToDecimal(data));
  var b = getLastDataByte(hexToDecimal(data));
  return toTwoDecimalPlaces((0.079*(256*a)+b));
}

/*
  Decodes the distance traveled with malfunction indicator lamp (MIL) on data value.
  @param data {String} The PID data to decode.
*/
function decodeFuelRailGaugePressure(data) {
  var a = getSecondLastDataByte(hexToDecimal(data));
  var b = getLastDataByte(hexToDecimal(data));
  return toTwoDecimalPlaces(10*(256*a+b));
}

/*
  Decodes the number of warm-ups since engine codes were cleared.
  @param data {String} The PID data to decode.
*/
function warmupsSinceCodesCleared(data) {
  return hexToDecimal(data);
}

/*
  Decodes the distance traveled since codes cleared.
  @param data {String} The PID data to decode.
*/
function decodeDistanceTraveledSinceCodesCleared(data) {
  var a = getSecondLastDataByte(hexToDecimal(data));
  var b = getLastDataByte(hexToDecimal(data));
  return (256*a)+b;
}

module.exports = {
  truncate: truncate,
  hexToDecimal: hexToDecimal,
  getParameterID: getParameterID,
  getLastDataByte: getLastDataByte,
  getSecondLastDataByte: getSecondLastDataByte,
  decodeCalculatedEngineLoad: decodeCalculatedEngineLoad,
  decodeTemperature: decodeTemperature,
  decodeShortTermFuelTrim: decodeShortTermFuelTrim,
  decodeFuelPressure: decodeFuelPressure,
  decodeIntakeManifoldAbsolutePressure: decodeIntakeManifoldAbsolutePressure,
  decodeEngineRPM: decodeEngineRPM,
  decodeVehicleSpeed: decodeVehicleSpeed,
  decodeTimingAdvance: decodeTimingAdvance,
  decodeMafAirFlowRate: decodeMafAirFlowRate,
  decodeThrottlePosition: decodeThrottlePosition,
  decodeOxygenSensorVoltage: decodeOxygenSensorVoltage,
  decodeOxygenSensorShortTermFuelTrim: decodeOxygenSensorShortTermFuelTrim,
  decodeRunTimeSinceEngineStart: decodeRunTimeSinceEngineStart,
  decodeDistanceTravelledMilOn: decodeDistanceTravelledMilOn,
  decodeFuelRailPressure: decodeFuelRailPressure,
  decodeFuelRailGaugePressure: decodeFuelRailGaugePressure,
  warmupsSinceCodesCleared: warmupsSinceCodesCleared,
  decodeDistanceTraveledSinceCodesCleared: decodeDistanceTraveledSinceCodesCleared
};
