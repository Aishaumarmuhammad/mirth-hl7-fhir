# Walkthrough

**Data flow:** HL7 v2 file -> Mirth (parse + transform) -> SQL Server, and HL7 -> FHIR Observation,
plus FHIR inbound over HTTP and FHIR outbound to a live FHIR server.

1. **HL7 inbound** — File Reader source, inbound datatype HL7 v2.x. Sample: `samples/test.hl7`.
2. **Transformer** — `transformers/01_hl7_read_and_log.js` reads PID-5 (name) and OBX-3/5 (test, value).
3. **SQL Server** — Database Writer using `sql/create_table.sql` and the INSERT shown there.
4. **HL7 -> FHIR** — `transformers/02_hl7_to_fhir_observation.js` builds a FHIR R4 Observation
   (LOINC-coded) into channelMap `fhirJson`. Output: `samples/observation.fhir.json`.
5. **FHIR inbound (REST)** — a second channel with an HTTP Listener (port 8081), JSON datatype,
   parsed by `transformers/03_fhir_http_receive.js`. Test with `scripts/curl_tests.md`.
6. **FHIR outbound (REST)** — HTTP Sender POSTs `${fhirJson}` to `https://hapi.fhir.org/baseR4/Observation`
   with `Content-Type: application/fhir+json`; the server returns 201 Created.

**Key mappings (HL7 -> FHIR):** OBX-5 value -> `valueQuantity.value`; OBX-6 unit -> `valueQuantity.unit`;
test code -> a **LOINC** coding; patient name -> `subject`.
