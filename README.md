# OBD-II Decoder

A node module that decodes responses from OBD-II vehicle queries.

[![NPM](https://nodei.co/npm/obd-ii-decoder.png)](https://npmjs.org/package/obd-ii-decoder)

NodeJS based Decoder for OBD-II (Car Diagnostics) PID's. OBD-II PIDs (On-board diagnostics Parameter IDs) are codes used to request data from a vehicle, used as a diagnostic tool.

SAE standard J/1939 defines many PIDs, but manufacturers also define many more PIDs specific to their vehicles. All light duty vehicles sold in North America since 1996, as well as medium duty vehicles beginning in 2005, and heavy duty vehicles beginning in 2010, are required to support OBD-II diagnostics, using a standardized data link connector, and a subset of the SAE J/1979 defined PIDs (or SAE J/1939 as applicable for medium/heavy duty vehicles), primarily for state mandated emissions inspections.

There are 2 modes of operation described in the latest OBD-II standard SAE J1979 that will be supported by this module.

Mode  Description
* 01	Show current data
* 03	Show stored Diagnostic Trouble Codes

## Decoding a Single Vehicle Response

The following methods can be used to decode a single response from the vehicle, where the inut parameter `data` is the data part of the response from the vehicle. Eg.The response 41 0C 23 or 410C23 is in the format MODE-PID-DATA. Passing in the data section for a given PID will decode it sucessfully.

* decodeCalculatedEngineLoad(data)
* decodeTemperature(data)
* decodeShortTermFuelTrim(data)
* decodeFuelPressure(data)
* decodeIntakeManifoldAbsolutePressure(data)
* decodeEngineRPM(data)
* decodeVehicleSpeed(data)
* decodeTimingAdvance(data)
* decodeMafAirFlowRate(data)
* decodeThrottlePosition(data)
* decodeOxygenSensorVoltage(data)
* decodeOxygenSensorShortTermFuelTrim(data)
* decodeRunTimeSinceEngineStart(data)
* decodeDistanceTravelledMilOn(data)
* decodeFuelRailPressure(data)
* decodeFuelRailGaugePressure(data)
* warmupsSinceCodesCleared(data)
* decodeDistanceTraveledSinceCodesCleared(data)

#### Example Usage
