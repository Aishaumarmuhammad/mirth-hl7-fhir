# Mirth Connect — HL7 & FHIR Interoperability

A hands-on healthcare interoperability project built with **Mirth Connect (NextGen Connect)**.
It demonstrates the full interface lifecycle across **both** major standards — **HL7 v2** and
**FHIR R4** — inbound and outbound, with a transformation and a SQL Server landing zone.

> Companion to my [KIS Interface Hub](https://github.com/Aishaumarmuhammad) project: that one
> shows I can parse HL7/FHIR *by hand*; this one shows I can orchestrate the same flow in a
> production-style **interface engine**.

## What it does

| Stage | Standard | Direction | What happens |
|-------|----------|-----------|--------------|
| 1 | HL7 v2 | inbound | A File Reader ingests an `ORU^R01` lab result; a JavaScript transformer reads PID/OBX fields |
| 2 | — | store | The mapped result is written to **SQL Server** (Database Writer) |
| 3 | HL7 → FHIR | transform | The HL7 result is mapped to a **FHIR Observation** coded with **LOINC** |
| 4 | FHIR | inbound | An HTTP Listener receives a FHIR resource over **REST** and parses it |
| 5 | FHIR | outbound | An HTTP Sender POSTs the FHIR Observation to a live **HAPI FHIR** server (201 Created) |

The core idea: the same lab result exists as an **HL7 segment**, a **FHIR resource**, and a
**database row** — an interface just transforms the information between those forms.

## Repository layout

```
transformers/   JavaScript used in the Mirth transformers (read HL7, HL7->FHIR, parse FHIR)
samples/        sample HL7 message and the resulting FHIR Observation
sql/            SQL Server table + the Database Writer INSERT
scripts/        curl commands to test the FHIR HTTP endpoints
channels/       exported Mirth channel definitions (XML)   <-- add your exports here
screenshots/    evidence: green Dashboard, Server Log, 201 response  <-- add your images here
docs/           short architecture / walkthrough notes
```

## How to run it

Full step-by-step build instructions are in `docs/walkthrough.md`. In short: install Mirth,
create the HL7 file channel, add the transformer, add a SQL Server destination, then add the
HL7→FHIR mapping, an HTTP Listener for FHIR inbound, and an HTTP Sender for FHIR outbound.

## Honest scope

These are hands-on learning channels, not a production integration. A production setup would add
**MLLP with ACK/NACK** for HL7, **OAuth** on the FHIR endpoints, **FHIR profile validation**, and
full **LOINC/SNOMED** terminology binding. Building HL7 *and* FHIR end to end gave me a real,
working understanding of how the two standards interoperate.

## License
MIT — see `LICENSE`.
