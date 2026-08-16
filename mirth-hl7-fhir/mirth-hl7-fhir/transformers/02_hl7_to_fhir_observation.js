// Mirth transformer step — map the HL7 v2 lab result to a FHIR R4 Observation.
// Produces channelMap "fhirJson", used by a File Writer or HTTP Sender destination.

var family = msg["PID"]["PID.5"]["PID.5.1"].toString();
var given  = msg["PID"]["PID.5"]["PID.5.2"].toString();
var value  = msg["OBX"]["OBX.5"]["OBX.5.1"].toString();   // 95
var unit   = msg["OBX"]["OBX.6"]["OBX.6.1"].toString();   // mg/dL
var name   = family + " " + given;

var observation = {
  resourceType: "Observation",
  status: "final",
  category: [{ coding: [{
    system: "http://terminology.hl7.org/CodeSystem/observation-category",
    code: "laboratory" }] }],
  code: { coding: [{
    system: "http://loinc.org", code: "2345-7", display: "Glucose" }] },  // LOINC (illustrative)
  subject: { display: name },
  valueQuantity: {
    value: parseFloat(value), unit: unit,
    system: "http://unitsofmeasure.org", code: unit }
};

channelMap.put("fhirJson", JSON.stringify(observation));
logger.info("FHIR Observation built: " + channelMap.get("fhirJson"));
