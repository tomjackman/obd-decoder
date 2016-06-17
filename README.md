# obd-decoder
Decoder for OBD-II (Car Diagnostics) PID's.

OBD-II PIDs (On-board diagnostics Parameter IDs) are codes used to request data from a vehicle, used as a diagnostic tool.

SAE standard J/1939 defines many PIDs, but manufacturers also define many more PIDs specific to their vehicles. All light duty vehicles (i.e. less than 8,500 pounds) sold in North America since 1996, as well as medium duty vehicles (i.e. 8,500-14,000 pounds) beginning in 2005, and heavy duty vehicles (i.e. greater than 14,000 pounds) beginning in 2010,[1] are required to support OBD-II diagnostics, using a standardized data link connector, and a subset of the SAE J/1979 defined PIDs (or SAE J/1939 as applicable for medium/heavy duty vehicles), primarily for state mandated emissions inspections.

There are 10 modes of operation described in the latest OBD-II standard SAE J1979. They are as follows:

Mode (hex)	Description
01	Show current data
02	Show freeze frame data
03	Show stored Diagnostic Trouble Codes
04	Clear Diagnostic Trouble Codes and stored values
05	Test results, oxygen sensor monitoring (non CAN only)
06	Test results, other component/system monitoring (Test results, oxygen sensor monitoring for CAN only)
07	Show pending Diagnostic Trouble Codes (detected during current or last driving cycle)
08	Control operation of on-board component/system
09	Request vehicle information
0A	Permanent Diagnostic Trouble Codes (DTCs) (Cleared DTCs)
