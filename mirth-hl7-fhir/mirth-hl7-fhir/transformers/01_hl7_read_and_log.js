// Mirth transformer step — read fields from an inbound HL7 v2 message and log them.
// Attach to the destination transformer of the HL7 channel.

var family = msg["PID"]["PID.5"]["PID.5.1"].toString();  // surname
var given  = msg["PID"]["PID.5"]["PID.5.2"].toString();  // first name
var test   = msg["OBX"]["OBX.3"]["OBX.3.1"].toString();  // e.g. GLU
var value  = msg["OBX"]["OBX.5"]["OBX.5.1"].toString();  // e.g. 95

logger.info("Result for " + family + ", " + given + ": " + test + " = " + value);

channelMap.put("nachname", family);
channelMap.put("testcode", test);
channelMap.put("wert", value);
