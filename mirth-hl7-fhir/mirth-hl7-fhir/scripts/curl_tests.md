# Test commands

## Send a FHIR Observation to the HTTP Listener channel (Step 8)
```bash
curl -X POST http://localhost:8081 \
  -H "Content-Type: application/fhir+json" \
  -d @samples/observation.fhir.json
```

## Post a FHIR Observation to a real public FHIR server (Step 9)
```bash
curl -X POST https://hapi.fhir.org/baseR4/Observation \
  -H "Content-Type: application/fhir+json" \
  -d @samples/observation.fhir.json
```
Expected: HTTP 201 Created, with a new resource id in the response.

## Read (GET) a resource from a FHIR server
```bash
curl "https://hapi.fhir.org/baseR4/Patient?_count=1"
```
