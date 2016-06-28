# OBD-II Decoder

A node module that decodes responses from OBD-II vehicle queries.

![OBD](http://www.totalcardiagnostics.com/images/connectorblue.gif)

NodeJS based Decoder for OBD-II (Car Diagnostics) PID's. OBD-II PIDs (On-board diagnostics Parameter IDs) are codes used to request data from a vehicle, used as a diagnostic tool.

SAE standard J/1939 defines many PIDs, but manufacturers also define many more PIDs specific to their vehicles. All light duty vehicles sold in North America since 1996, as well as medium duty vehicles beginning in 2005, and heavy duty vehicles beginning in 2010, are required to support OBD-II diagnostics, using a standardized data link connector, and a subset of the SAE J/1979 defined PIDs (or SAE J/1939 as applicable for medium/heavy duty vehicles), primarily for state mandated emissions inspections.

There are 2 modes of operation described in the latest OBD-II standard SAE J1979 that will be supported by this module.

Mode  Description
* 01	Show current data
* 03	Show stored Diagnostic Trouble Codes

## Methods

### hexToDecimal(hexString)
This method decodes a string of hex into decimal format.

#### Parameters
* hexString - the string of hex to decode

#### Example Usage
