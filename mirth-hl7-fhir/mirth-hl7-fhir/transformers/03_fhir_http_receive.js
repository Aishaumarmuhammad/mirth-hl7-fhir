// Mirth transformer step — parse an inbound FHIR resource received over HTTP (JSON).
// Attach to the transformer of the FHIR_HTTP_In channel (Source = HTTP Listener).

var body = connectorMessage.getRawData();   // the raw POST body (FHIR JSON)
var fhir = JSON.parse(body);

var type = fhir.resourceType;
var code = fhir.code ? fhir.code.coding[0].code : "";
var val  = fhir.valueQuantity ? fhir.valueQuantity.value : "";

logger.info("Received FHIR " + type + " — code " + code + ", value " + val);
